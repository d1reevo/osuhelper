"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Недействительная ссылка для сброса пароля.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => router.push("/login"), 3000);
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
    <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800">
      <h1 className="text-2xl font-bold text-white mb-2">Новый пароль</h1>
      <p className="text-zinc-400 text-sm mb-6">
        Введите новый пароль для вашего аккаунта.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Новый пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <Input
            placeholder="Повторите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium p-2 bg-red-900/20 border border-red-900 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-500 text-sm font-medium p-2 bg-green-900/20 border border-green-900 rounded">
            {message}
            <p className="text-xs mt-1">Перенаправляем на страницу входа...</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading || !token}>
          {loading ? "Сохранение..." : "Сохранить новый пароль"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-zinc-400 hover:text-white">
          ← Вернуться к входу
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-zinc-400 text-center">Загрузка...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
