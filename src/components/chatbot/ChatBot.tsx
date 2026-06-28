'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, X, MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function ChatBot() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: isAr ? 'مرحباً بك! أنا مساعدك الذكي.' : 'Welcome! I am your AI assistant.' }
  ]);
  const [input, setInput] = useState('');

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-2xl">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-white border rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="bg-emerald-600 text-white p-4 font-bold text-sm flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>{isAr ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}</span>
            </div>
            <div className="p-4 h-[300px] overflow-y-auto space-y-3 bg-slate-50">
              {messages.map(msg => (
                <div key={msg.id} className={"flex items-start gap-2 " + (msg.role === 'user' ? 'flex-row-reverse' : '')}>
                  <div className={"p-2.5 rounded-xl text-xs " + (msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-800')}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}