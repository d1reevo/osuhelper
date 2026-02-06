import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PublicProfile({ params }: { params: { slug: string } }) {
    const settings = await prisma.profileSettings.findUnique({
        where: { slug: params.slug },
        include: { user: { include: { osuConnection: true, snapshots: { take: 1, orderBy: { date: 'desc' } } } } }
    });

    if (!settings || settings.privacyLevel === 'private') {
        return notFound();
    }

    const { user } = settings;
    const { osuConnection: osu } = user;

    if (!osu) return <div>User has not connected osu!</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-6">
                     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                         <img src={osu.avatarUrl || ''} alt={osu.osuUsername} className="w-full h-full object-cover" />
                     </div>
                     <div>
                         <h1 className="text-4xl font-bold">{osu.osuUsername}</h1>
                         <div className="text-2xl text-muted-foreground">#{osu.globalRank}</div>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader><CardTitle>PP</CardTitle></CardHeader>
                        <CardContent className="text-3xl font-bold">{osu.pp?.toFixed(0)}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Accuracy</CardTitle></CardHeader>
                        <CardContent className="text-3xl font-bold">{osu.accuracy?.toFixed(2)}%</CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Playcount</CardTitle></CardHeader>
                        <CardContent className="text-3xl font-bold">{osu.playCount}</CardContent>
                    </Card>
                </div>
                
                {/* Graphs would go here similar to dashboard but read-only */}
            </div>
        </div>
    )
}
