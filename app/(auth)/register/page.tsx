"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/login");
            } else {
                setError(data.error || "Ошибка регистрации");
            }
        } catch (err) {
            setError("Произошла ошибка сети");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-[#0a0a1a]">
            <div className="w-full max-w-md p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 backdrop-blur">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">o!</div>
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-2">Создать аккаунт</h1>
                <p className="text-zinc-500 text-sm text-center mb-6">Зарегистрируйся, чтобы отслеживать прогресс в osu!</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <Input placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm font-medium p-2 bg-red-900/20 border border-red-900 rounded">
                            {error === "User already exists or error" ? "Пользователь с таким email или именем уже существует" : error}
                        </div>
                    )}
                    <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full h-11">Создать аккаунт</Button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-zinc-500 hover:text-white text-sm transition-colors">Уже есть аккаунт? Войти</Link>
                </div>
            </div>
        </div>
    )
}
