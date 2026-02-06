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
        <div className="flex h-screen items-center justify-center bg-zinc-950">
            <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800">
                <h1 className="text-3xl font-bold text-white mb-6">Вход в osu!Helper</h1>
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
                    <Button type="submit" className="w-full">Войти</Button>
                </form>
                <div className="mt-3 text-center">
                    <Link href="/forgot-password" className="text-sm text-pink-400 hover:text-pink-300">Забыли пароль?</Link>
                </div>
                <div className="mt-3 text-center">
                    <Link href="/register" className="text-zinc-400 hover:text-white">Нет аккаунта? Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}
