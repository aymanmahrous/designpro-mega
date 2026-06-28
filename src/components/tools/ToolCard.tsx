'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Star, Users, ExternalLink } from 'lucide-react';
import { useLocale } from 'next-intl';
import { db } from '@/lib/supabase';
import type { Tool, Review } from '@/types/index';

const pricingStyles: Record<string, string> = {
  free: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  freemium: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900',
  paid: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
};

export default function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(tool.rating || 0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!tool || !tool.id) return;
        const data = await db.reviews.getByToolId(tool.id);
        setReviews(data || []);
        const avg = await db.reviews.getAverageRating(tool.id);
        if (avg > 0) {
          setAverageRating(avg);
        }
      } catch (e) {
        console.error('Failed to fetch reviews:', e);
      }
    };
    fetchReviews();
  }, [tool.id]);

  const features = isAr ? tool.features_ar : tool.features_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), type: 'spring', stiffness: 100 }}
      className="h-full"
    >
      <Link href={'/' + locale + '/tools/' + tool.id} className="block h-full">
        <Card className="h-full group relative overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <CardContent className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-3.5">
                <Avatar className="w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 p-1 shrink-0">
                  <AvatarImage src={tool.logo_url || '/placeholder.svg'} alt={tool.name} className="object-contain" />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-slate-950 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {isAr ? tool.name_ar : tool.name}
                    </h3>
                    {tool.is_new && (
                      <Badge className="bg-amber-500 text-white border-0 text-[10px] uppercase font-bold px-1.5 py-0">
                        {isAr ? 'جديد' : 'NEW'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{isAr ? tool.category_ar : tool.category}</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-3.5 leading-relaxed">
                {isAr ? tool.description_ar : tool.description}
              </p>

              {features && features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {features.slice(0, 3).map((feat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-700/60"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-800/60 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 
                  {averageRating.toFixed(1)} 
                  <span className="text-[10px] text-slate-400">({reviews.length > 0 ? reviews.length : tool.reviews_count || 0})</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 
                  {(tool.users_count || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="text-[10px] font-semibold border-slate-200 text-slate-500 dark:text-slate-400 dark:border-slate-700">
                    {isAr ? (tool.difficulty === 'beginner' ? 'مبتدئ' : tool.difficulty === 'intermediate' ? 'متوسط' : 'متقدم') : tool.difficulty}
                  </Badge>
                  <Badge variant="outline" className={"text-[10px] font-bold tracking-wide uppercase px-2 " + (pricingStyles[tool.pricing] || '')}>
                    {isAr ? (tool.pricing === 'free' ? 'مجاني' : tool.pricing === 'paid' ? 'مدفوع' : 'فريميوم') : tool.pricing}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs opacity-80 group-hover:opacity-100 transition-all">
                  <span>{isAr ? 'عرض' : 'View'}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}