"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
    LayoutDashboard, 
    Activity, 
    Map as MapIcon, 
    Target, 
    Trophy, 
    Flame, 
    Users, 
    GitCompare, 
    Settings,
    LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Дашборд", href: "/dashboard", icon: LayoutDashboard },
    { name: "Активность", href: "/activity", icon: Activity },
    { name: "Карты", href: "/maps", icon: MapIcon },
    { name: "Цели", href: "/goals", icon: Target },
    { name: "Ачивки", href: "/achievements", icon: Trophy },
    { name: "Стрики", href: "/streaks", icon: Flame },
    { name: "Друзья", href: "/friends", icon: Users },
    { name: "Сравнение", href: "/compare", icon: GitCompare },
    { name: "Настройки", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-card border-r w-64 p-4">
            <div className="text-2xl font-bold mb-8 text-primary">osu!Helper</div>
            <nav className="flex-1 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                isActive 
                                    ? "bg-primary text-primary-foreground" 
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-3 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md mt-auto"
            >
                <LogOut className="w-5 h-5" />
                Выйти
            </button>
        </div>
    )
}
