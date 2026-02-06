import { NextRequest, NextResponse } from "next/server";
import { runJob } from "@/lib/jobs";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    const type = searchParams.get("type");

    if (secret !== process.env.JOB_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!type || !['PROFILE', 'SCORES', 'SNAPSHOT'].includes(type)) {
         return NextResponse.json({ error: "Invalid Type" }, { status: 400 });
    }

    // Run in background (fire and forget for response, but Vercel might kill it)
    // For local/VPS node-cron, await is fine.
    await runJob(type as 'PROFILE' | 'SCORES' | 'SNAPSHOT');

    return NextResponse.json({ success: true, message: `Job ${type} executed` });
}
