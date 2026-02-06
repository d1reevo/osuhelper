"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ActivityPage() {
    const { data: session } = useSession();
    
    // In a real app we'd fetch this from /api/osu/recent
    useEffect(() => {
        // Need to implement the API to return the RecentScores stored in DB
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Недавняя Активность</h1>
            <div className="text-muted-foreground">
                Отслеживает последние скоры (сохраненные в БД через фоновые задачи или обновление вручную).
            </div>
            
            {/* Placeholder for activity feed */}
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Скоро будет...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Лента активности заполнится, как только фоновые задачи (Background Jobs) начнут загружать ваши последние скоры из osu!
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
