"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function AchievementsPage() {
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Ачивки</h1>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="opacity-50">
                    <CardHeader className="flex flex-col items-center">
                        <Trophy className="w-10 h-10 mb-2" />
                        <CardTitle className="text-center">Клуб 5000pp</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                        Наберите 5,000 общего pp.
                    </CardContent>
                </Card>
                 <Card className="border-primary bg-primary/10">
                    <CardHeader className="flex flex-col items-center">
                        <Trophy className="w-10 h-10 mb-2 text-primary" />
                        <CardTitle className="text-center">Клуб 1000pp</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                        Получено 1 Января 2024
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
