'use client';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center text-xs sm:text-sm text-slate-400">
        <p>© {new Date().getFullYear()} DesignPro MEGA. {isAr ? 'جميع الحقوق محفوظة. تم التطوير بحب وشغف.' : 'All rights reserved. Built with precision.'}</p>
      </div>
    </footer>
  );
}