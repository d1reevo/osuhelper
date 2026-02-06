import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import axios from "axios";
import { addSeconds } from "date-fns";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post("https://osu.ppy.sh/oauth/token", {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${new URL(req.url).origin}/api/osu/callback`,
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user info from osu! to save ID and Username
    const meResponse = await axios.get("https://osu.ppy.sh/api/v2/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const osuUser = meResponse.data;

    // Upsert OsuConnection
    await prisma.osuConnection.upsert({
      where: { userId: session.user.id },
      update: {
        osuId: osuUser.id.toString(),
        osuUsername: osuUser.username,
        accessToken: access_token,
        refreshToken: encrypt(refresh_token),
        expiresAt: addSeconds(new Date(), expires_in),
        globalRank: osuUser.statistics.global_rank,
        countryRank: osuUser.statistics.country_rank,
        pp: osuUser.statistics.pp,
        accuracy: osuUser.statistics.hit_accuracy,
        playCount: osuUser.statistics.play_count,
        level: osuUser.statistics.level.current,
        avatarUrl: osuUser.avatar_url,
      },
      create: {
        userId: session.user.id,
        osuId: osuUser.id.toString(),
        osuUsername: osuUser.username,
        accessToken: access_token,
        refreshToken: encrypt(refresh_token),
        expiresAt: addSeconds(new Date(), expires_in),
        globalRank: osuUser.statistics.global_rank,
        countryRank: osuUser.statistics.country_rank,
        pp: osuUser.statistics.pp,
        accuracy: osuUser.statistics.hit_accuracy,
        playCount: osuUser.statistics.play_count,
        level: osuUser.statistics.level.current,
        countryCode: osuUser.country_code,
        avatarUrl: osuUser.avatar_url,
      },
    });

    // Also Initialize Profile Settings if not exists
    const settings = await prisma.profileSettings.findUnique({ where: { userId: session.user.id } });
    if (!settings) {
      await prisma.profileSettings.create({
        data: { 
            userId: session.user.id,
            slug: osuUser.username.toLowerCase().replace(/ /g, '_')
        }
      });
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Osu callback error", error);
    return NextResponse.redirect(new URL("/settings?error=osu_connect_failed", req.url));
  }
}
