import { getTools } from '@/lib/data';
import ToolCard from '@/components/tools/ToolCard';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; pricing?: string }>;
}

export default async function ToolsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { q, category, pricing } = await searchParams;

  const isAr = locale === 'ar';

  // ✔ إصلاح الخطأ: getTools يرجّع Promise
  let toolsList = await getTools();

  if (q) {
    const queryStr = q.trim().toLowerCase();
    toolsList = toolsList.filter(t =>
      t.name_ar.includes(queryStr) ||
      t.name.toLowerCase().includes(queryStr)
    );
  }

  if (category) {
    toolsList = toolsList.filter(
      t => t.category_ar === category || t.category === category
    );
  }

  if (pricing) {
    toolsList = toolsList.filter(t => t.pricing === pricing);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {isAr ? 'مستودع الأدوات الإبداعية' : 'Creative Software Repository'}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {isAr
            ? `تم العثور على ${toolsList.length} أداة حقيقية محققة`
            : `Discovered ${toolsList.length} verified production tools`}
        </p>
      </div>

      {toolsList.length === 0 ? (
        <div className="text-center py-20 text-slate-400 border border-dashed rounded-2xl">
          <p className="text-base">
            {isAr
              ? 'لم نجد أي أداة تطابق خيارات البحث الحالية.'
              : 'No software matches your current filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsList.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
