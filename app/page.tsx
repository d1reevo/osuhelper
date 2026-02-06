import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Target, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
      redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Trophy className="w-4 h-4" />
          </div>
          osu!Helper
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Войти
          </Link>
          <Button asChild>
            <Link href="/register">Начать Сейчас</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 text-center space-y-8 max-w-5xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Теперь с поддержкой osu!api v2
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Отслеживай прогресс в osu! как никогда раньше
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Продвинутая аналитика, цели, детальная история и система сравнения с друзьями. Всё в одном месте.
          </p>
          <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Button size="lg" className="h-12 px-8 text-lg gap-2" asChild>
              <Link href="/register">
                Начать Трекинг <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          </div>
          
          {/* Mockup / Image Placeholder */}
          <div className="mt-16 rounded-xl border bg-card/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                    <Trophy className="w-16 h-16 mx-auto opacity-20" />
                    <p>Превью Дашборда</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-secondary/20 border-t">
          <div className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Умные Цели</h3>
              <p className="text-muted-foreground">Установи цели по PP, Ранку или Аккураси. Мы следим за прогрессом и прогнозируем достижение.</p>
            </div>
            <div className="space-y-4 p-6 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Лидерборды с Друзьями</h3>
              <p className="text-muted-foreground">Создавайте свои топы с друзьями. Соревнуйтесь в прогрессе за неделю, а не только по общему PP.</p>
            </div>
             <div className="space-y-4 p-6 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Уникальные Ачивки</h3>
              <p className="text-muted-foreground">Открывайте бейджи за стабильность, камбэки и майлстоуны, которые osu! не отслеживает.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t text-center text-muted-foreground text-sm">
        <p>&copy; 2025 osu!Helper. Не связано с ppy.</p>
      </footer>
    </div>
  );
}
