// Placeholder for Friends System
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FriendsPage() {
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Друзья</h1>
                <Button>Добавить друга</Button>
            </div>
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    Друзья еще не добавлены. Поделись своим ID профиля, чтобы законнектиться!
                </CardContent>
            </Card>
        </div>
    )
}
