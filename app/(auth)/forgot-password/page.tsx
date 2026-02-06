"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNewPassword("");
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setNewPassword(data.newPassword);
      } else {
        setError(data.error || "Произошла ошибка");
      }
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800">
        <h1 className="text-2xl font-bold text-white mb-2">Сброс пароля</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Введите Email аккаунта. Мы сгенерируем новый пароль.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium p-2 bg-red-900/20 border border-red-900 rounded">
              {error}
            </div>
          )}

          {newPassword && (
            <div className="p-4 bg-green-900/20 border border-green-900 rounded space-y-2">
              <p className="text-green-500 text-sm font-medium">Пароль успешно сброшен!</p>
              <p className="text-zinc-300 text-sm">Ваш новый пароль:</p>
              <div className="bg-zinc-800 p-3 rounded text-center">
                <code className="text-lg text-white font-mono tracking-widest select-all">{newPassword}</code>
              </div>
              <p className="text-zinc-500 text-xs">Скопируйте его и используйте для входа. Потом можете сменить в настройках.</p>
            </div>
          )}

          {!newPassword && (
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Сброс..." : "Сбросить пароль"}
            </Button>
          )}

          {newPassword && (
            <Link href="/login">
              <Button className="w-full">Войти с новым паролем</Button>
            </Link>
          )}
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-zinc-400 hover:text-white">
            ← Вернуться к входу
          </Link>
        </div>
      </div>
    </div>
  );
}
