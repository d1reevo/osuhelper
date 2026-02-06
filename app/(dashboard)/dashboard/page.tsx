"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";
import { ArrowUp, ArrowDown, Activity, Trophy, Hash, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<any>(null);
    const [snapshots, setSnapshots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/osu/me");
            const data = await res.json();
            setStats(data);
            
            const snapRes = await fetch("/api/snapshots/range?days=30");
            const snapData = await snapRes.json();
            setSnapshots(snapData.snapshots);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) fetchData();
    }, [session]);

    if (!session) return <div>Пожалуйста, войдите в систему</div>;
    if (loading) return <div>Загрузка дашборда...</div>;

    if (!stats?.osuConnection) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold mb-4">Подключите osu!, чтобы видеть статистику</h2>
                <Button asChild>
                    <Link href="/settings">Перейти в настройки</Link>
                </Button>
            </div>
        )
    }

    const { osuConnection } = stats;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Привет, {osuConnection.osuUsername}</h1>
                <Button onClick={fetchData} variant="outline">Обновить данные</Button>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="PP (Performance)" 
                    value={`${osuConnection.pp?.toFixed(0) || 0}pp`} 
                    icon={Trophy}
                />
                <StatCard 
                    title="Глобальный Ранк" 
                    value={`#${osuConnection.globalRank || '-'}`} 
                    icon={Hash}
                />
                <StatCard 
                    title="Точность (Accuracy)" 
                    value={`${osuConnection.accuracy?.toFixed(2) || 0}%`} 
                    icon={Activity}
                />
                <StatCard 
                    title="Всего игр (Playcount)" 
                    value={osuConnection.playCount} 
                    icon={Zap}
                />
            </div>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>История Ранка (30 Дней)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={snapshots}>
                                <defs>
                                    <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="date" tickFormatter={(t) => new Date(t).getDate().toString()} />
                                <YAxis reversed domain={['auto', 'auto']} />
                                <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
                                <Area type="monotone" dataKey="globalRank" stroke="#8884d8" fillOpacity={1} fill="url(#colorRank)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Прогресс PP (30 Дней)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={snapshots}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="date" tickFormatter={(t) => new Date(t).getDate().toString()} />
                                <YAxis domain={['auto', 'auto']} />
                                <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
                                <Area type="monotone" dataKey="pp" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    );
}

function StatCard({ title, value, icon: Icon }: { title: string, value: string | number, icon: any }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
