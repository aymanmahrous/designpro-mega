'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Layers, User, Palette, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTools, getTemplates } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('classic');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('designpro-template') || 'classic';
    setCurrentTemplate(saved);
    document.documentElement.setAttribute('data-template', saved);
  }, []);

  const changeTemplate = (id: string) => {
    setCurrentTemplate(id);
    localStorage.setItem('designpro-template', id);
    document.documentElement.setAttribute('data-template', id);
    setTemplateOpen(false);
  };

  const handleLangChange = (lang: string) => {
    const cleanPath = pathname.replace(/^\/(ar|en)/, '');
    router.push('/' + lang + (cleanPath || '/'));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push('/' + locale + '/tools?q=' + encodeURIComponent(query.trim()));
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm h-16 flex items-center justify-between px-6">
      <Link href={'/' + locale} className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
        <Layers className="w-6 h-6" />
        <span>DesignPro MEGA</span>
      </Link>
      <div className="flex gap-4 text-sm font-medium items-center">
        <Link href={'/' + locale + '/tools'}>{locale === 'ar' ? 'الأدوات' : 'Tools'}</Link>
        <Link href={'/' + locale + '/categories'}>{locale === 'ar' ? 'التصنيفات' : 'Categories'}</Link>
        <button onClick={() => handleLangChange(locale === 'ar' ? 'en' : 'ar')} className="border px-2 py-0.5 rounded text-xs">
          {locale === 'ar' ? 'EN' : 'AR'}
        </button>
      </div>
    </nav>
  );
}