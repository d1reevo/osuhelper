"use client";
import { Card, CardContent } from "@/components/ui/card";
export default function GoalsPage() {
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Цели</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">Набрать 5000pp</h3>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[70%]"></div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">3500 / 5000</div>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
