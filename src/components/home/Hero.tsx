'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-cyan-950 text-white py-24 relative overflow-hidden border-b border-slate-800">
      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.15] bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200">
          {locale === 'ar' ? 'اكتشف وفلتر أقوى أدوات التصميم والإبداع' : 'Discover the Ultimate Hub for Creative Tools'}
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-slate-300 font-light">
          {locale === 'ar' ? 'تصفح وقارن بين أكثر من 70 أداة متطورة للتصميم، المونتاج، الإنتاج البصري، والذكاء الاصطناعي في مكان واحد.' : 'Explore and compare over 70 advanced platforms built for graphic designers, filmmakers and prompt engineers.'}
        </p>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={e => { e.preventDefault(); if(q.trim()) router.push(`/${locale}/tools?q=${encodeURIComponent(q.trim())}`); }} className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-2xl border border-slate-200 dark:border-slate-800">
            <Input
              type="search"
              placeholder={locale === 'ar' ? 'ابحث عن أداتك المفضلة...' : 'Search for any tool...'}
              value={q}
              onChange={e => setQ(e.target.value)}
              className="border-0 flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-0 text-base px-4 shadow-none"
            />
            <Button type="submit" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-7 h-12 shrink-0">
              <Search className="w-4 h-4 ml-2" />
              {locale === 'ar' ? 'ابحث الآن' : 'Search'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}