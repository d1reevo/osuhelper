"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapsPage() {
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Аналитика Карт</h1>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Любимые Мапперы</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            <li>Sotarks (150 plays)</li>
                            <li>Monstrata (120 plays)</li>
                            <li>Sotarks (again)</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Предпочтения по Star Rating</CardTitle></CardHeader>
                    <CardContent>
                         Здесь будет гистограмма
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
