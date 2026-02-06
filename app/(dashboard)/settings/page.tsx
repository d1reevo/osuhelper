"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (session) {
            fetch("/api/osu/me").then(r => r.json()).then(setUser);
        }
    }, [session]);

    const connectOsu = () => {
        const clientId = process.env.NEXT_PUBLIC_OSU_CLIENT_ID;
        const redirectUri = encodeURIComponent("http://localhost:3000/api/osu/callback");
        window.location.href = `https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public identify`;
    };

    if (!session) return <div>Требуется вход</div>;

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold">Настройки</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Подключение osu!</CardTitle>
                </CardHeader>
                <CardContent>
                    {user?.osuConnection ? (
                        <div className="flex items-center gap-4">
                            <div className="text-green-500 font-bold">Подключено как {user.osuConnection.osuUsername}</div>
                            {/* <Button variant="destructive">Disconnect</Button> */} 
                        </div>
                    ) : (
                        <div>
                             <p className="mb-4 text-muted-foreground">Подключи свой аккаунт osu!, чтобы отслеживать прогресс.</p>
                             <Button onClick={connectOsu} className="gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Подключить osu!
                             </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Приватность</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>Видимость профиля определяет, кто может видеть вашу статистику.</p>
                        {/* Add Select/Switch components here hooked to an API */}
                        <Button variant="outline">Сохранить изменения</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
