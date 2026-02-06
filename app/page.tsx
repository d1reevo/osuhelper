import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Target, Trophy, Users, Zap } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
      redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a]">
      {/* Header */}
      <header className="px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            o!
          </div>
          <span className="font-bold text-lg text-white">osu!helper</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Войти
          </Link>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full px-6">
            <Link href="/register">Начать</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 md:pt-36 pb-20 px-6 text-center relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-sm font-medium text-pink-400">
              <Zap className="w-4 h-4" />
              Бесплатно для всех игроков
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white">Отслеживай свой </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">osu!</span>
              <br />
              <span className="text-white">прогресс</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Персональный дашборд с аналитикой, целями, достижениями и социальными функциями. Смотри свой прогресс и соревнуйся с друзьями.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="h-13 px-8 text-base gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full shadow-lg shadow-pink-500/25">
                <Link href="/register">
                  Начать бесплатно <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-13 px-8 text-base rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <Link href="/login">Войти</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Детальная аналитика</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Отслеживай PP, ранг, точность и количество игр с красивыми графиками</p>
            </div>
            
            <div className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ставь цели</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Создавай личные цели и следи за прогрессом их достижения</p>
            </div>
            
            <div className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-5">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Достижения</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Получай награды за вехи и стабильные тренировки</p>
            </div>
            
            <div className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Социальные функции</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Добавляй друзей, сравнивай статистику и смотри таблицы лидеров</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-zinc-800/50 text-center text-zinc-600 text-sm">
        <p>&copy; 2025 osu!helper. Не связано с ppy.</p>
      </footer>
    </div>
  );
}
