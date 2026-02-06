"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email, password, redirect: false
        });

        if (res?.ok) {
            router.push("/dashboard");
        } else {
            alert("Неверные данные для входа");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-[#0a0a1a]">
            <div className="w-full max-w-md p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 backdrop-blur">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">o!</div>
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-2">Вход в osu!helper</h1>
                <p className="text-zinc-500 text-sm text-center mb-6">Войди, чтобы увидеть свою статистику</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder="Пароль" 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full h-11">Войти</Button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/forgot-password" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">Забыли пароль?</Link>
                </div>
                <div className="mt-3 text-center">
                    <Link href="/register" className="text-zinc-500 hover:text-white text-sm transition-colors">Нет аккаунта? Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}
