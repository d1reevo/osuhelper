"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComparePage() {
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Сравнение</h1>
             <p className="text-muted-foreground">Сравни свои результаты с друзьями.</p>
             
             <div className="grid grid-cols-2 gap-8">
                {/* Me */}
                <Card>
                    <CardHeader>
                        <CardTitle>Вы</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">5000pp</div>
                         <div className="text-sm text-muted-foreground">#120,400</div>
                    </CardContent>
                </Card>

                {/* Them */}
                <Card>
                    <CardHeader>
                        <CardTitle>Выберите друга</CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center justify-center h-[100px] border-dashed border-2 rounded-md">
                        Кнопка выбора друга
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
