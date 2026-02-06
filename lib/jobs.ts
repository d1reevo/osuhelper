// The core logic to update a user's data
import { prisma } from "./prisma";
import { fetchOsu } from "./osu";
import { Snapshot, User, OsuConnection, RecentScore } from "@prisma/client";

export async function updateUserProfile(userId: string) {
  try {
    const data = await fetchOsu('/me', userId, { mode: 'osu' });
    
    await prisma.osuConnection.update({
      where: { userId },
      data: {
        globalRank: data.statistics.global_rank,
        countryRank: data.statistics.country_rank,
        pp: data.statistics.pp,
        accuracy: data.statistics.hit_accuracy,
        playCount: data.statistics.play_count,
        level: data.statistics.level.current,
        avatarUrl: data.avatar_url,
        lastUpdated: new Date()
      }
    });

    // Check for daily snapshot
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingSnapshot = await prisma.snapshot.findFirst({
      where: {
        userId,
        date: { gte: today }
      }
    });

    if (!existingSnapshot) {
      await prisma.snapshot.create({
        data: {
          userId,
          globalRank: data.statistics.global_rank || 0,
          countryRank: data.statistics.country_rank || 0,
          pp: data.statistics.pp || 0,
          accuracy: data.statistics.hit_accuracy || 0,
          playCount: data.statistics.play_count || 0,
          level: data.statistics.level.current || 0,
          date: new Date() 
        }
      });
    } else {
        // Optional: Update todays snapshot to be the latest value
         await prisma.snapshot.update({
            where: { id: existingSnapshot.id },
            data: {
                globalRank: data.statistics.global_rank || 0,
                countryRank: data.statistics.country_rank || 0,
                pp: data.statistics.pp || 0,
                accuracy: data.statistics.hit_accuracy || 0,
                playCount: data.statistics.play_count || 0,
                level: data.statistics.level.current || 0,
            }
         })
    }
  } catch (e) {
    console.error(`Failed to update profile for ${userId}`, e);
  }
}

export async function updateUserRecentScores(userId: string) {
    try {
        const scores = await fetchOsu(`/users/${(await getOsuId(userId))}/scores/recent`, userId, { 
            include_fails: 1, 
            mode: 'osu',
            limit: 20 
        });

        // Insert new scores
        for (const score of scores) {
            // Check existence
            const exists = await prisma.recentScore.findUnique({
                where: { osuScoreId: String(score.id) }
            });

            if (!exists) {
                await prisma.recentScore.create({
                    data: {
                        userId,
                        osuScoreId: String(score.id),
                        beatmapId: String(score.beatmap.id),
                        beatmapSetId: String(score.beatmapset.id),
                        beatmapTitle: score.beatmapset.title,
                        beatmapVersion: score.beatmap.version,
                        artist: score.beatmapset.artist,
                        accuracy: score.accuracy,
                        rank: score.rank,
                        maxCombo: score.max_combo,
                        pp: score.pp || 0,
                        mods: JSON.stringify(score.mods),
                        score: BigInt(score.score),
                        createdAt: new Date(score.created_at)
                    }
                });
            }
        }
    } catch (e) {
        console.error("Failed recent scores", e);
    }
}

async function getOsuId(userId: string) {
    const conn = await prisma.osuConnection.findUnique({ where: { userId }});
    return conn?.osuId;
}

export async function runJob(type: 'PROFILE' | 'SCORES' | 'SNAPSHOT') {
    // Get all users with osu connection
    const users = await prisma.user.findMany({
        where: { osuConnection: { isNot: null } },
        select: { id: true }
    });

    // In a real generic queue, we would distribute this. 
    // Here we loop with small delay to avoid rate limits
    for (const user of users) {
        if (type === 'PROFILE' || type === 'SNAPSHOT') {
            await updateUserProfile(user.id);
        }
        if (type === 'SCORES') {
            await updateUserRecentScores(user.id);
        }
        // Artificial delay 500ms
        await new Promise(r => setTimeout(r, 500));
    }
}
