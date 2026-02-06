"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StreaksPage() {
    // Generate dummy data for last 365 days
    const days = Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        return {
            date,
            count: Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0
        };
    });

    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Стрики и Активность</h1>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card>
                     <CardHeader>
                         <CardTitle>Текущий Стрик</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <div className="text-4xl font-bold text-orange-500">🔥 12 Дней</div>
                     </CardContent>
                 </Card>
                 <Card>
                     <CardHeader>
                         <CardTitle>Самый длинный стрик</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <div className="text-4xl font-bold">24 Дня</div>
                     </CardContent>
                 </Card>
             </div>

             <Card>
                 <CardHeader>
                     <CardTitle>Карта Активности (За год)</CardTitle>
                 </CardHeader>
                 <CardContent>
                     {/* GitHub style heatmap grid */}
                     <div className="flex flex-wrap gap-1">
                        {days.map((d, i) => {
                            let color = "bg-secondary";
                            if (d.count > 0) color = "bg-green-900";
                            if (d.count > 10) color = "bg-green-700";
                            if (d.count > 30) color = "bg-green-500";
                            
                            return (
                                <div 
                                    key={i} 
                                    className={`w-3 h-3 rounded-sm ${color}`}
                                    title={`${d.date.toDateString()}: ${d.count} plays`}
                                />
                            )
                        })}
                     </div>
                 </CardContent>
             </Card>
        </div>
    )
}
