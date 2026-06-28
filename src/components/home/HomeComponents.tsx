import { getFeaturedTools, getCategories } from '@/lib/data';
import ToolCard from '@/components/tools/ToolCard';
import Link from 'next/link';

export async function FeaturedTools() {
  const tools = await getFeaturedTools();
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">الأدوات المميزة</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export async function CategoriesSection() {
  const categories = await getCategories();
  return (
    <section className="py-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/tools/${cat.slug}`}
            className="px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"
          >
            {cat.icon} {cat.name_ar}
          </Link>
        ))}
      </div>
    </section>
  );
}