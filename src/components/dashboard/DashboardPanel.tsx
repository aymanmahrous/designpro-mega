'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTools, getCategories } from '@/lib/data';

export default function DashboardPanel() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [tools, setTools] = useState(getTools());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = searchQuery 
    ? tools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.name_ar.includes(searchQuery)) 
    : tools;

  const handleDelete = (id: string) => {
    setTools(prev => prev.filter(t => t.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-black mb-8 tracking-tight text-slate-900 dark:text-white">
        {isAr ? 'لوحة التحكم للمنصة' : 'Admin Dashboard'}
      </h1>
      
      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="tools" className="rounded-lg">{isAr ? 'الأدوات' : 'Tools'}</TabsTrigger>
          <TabsTrigger value="categories" className="rounded-lg">{isAr ? 'التصنيفات' : 'Categories'}</TabsTrigger>
          <TabsTrigger value="users" className="rounded-lg">{isAr ? 'المستخدمين' : 'Users'}</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">{isAr ? 'المراجعات' : 'Reviews'}</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Input
              type="search"
              placeholder={isAr ? 'البحث السريع عن أداة...' : 'Quick search...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="max-w-md rounded-lg bg-white dark:bg-slate-900"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                  {isAr ? 'إضافة أداة جديدة +' : 'Add New Tool +'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="font-bold text-lg text-slate-900 dark:text-white">
                    {isAr ? 'إدراج أداة إبداعية جديدة' : 'Insert Premium Tool'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <Input placeholder={isAr ? 'الاسم بالإنجليزية (e.g. Figma)' : 'Name (English)'} className="rounded-lg" />
                  <Input placeholder={isAr ? 'الاسم بالعربية (مثال: فيجما)' : 'Name (Arabic)'} className="rounded-lg" />
                  <Input placeholder={isAr ? 'رابط الشعار URL' : 'Logo Link URL'} className="rounded-lg" />
                  <Input placeholder={isAr ? 'رابط الأفلييت والتسويق' : 'Affiliate URL Link'} className="rounded-lg" />
                  <Select>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder={isAr ? 'اختر التصنيف' : 'Category'} /></SelectTrigger>
                    <SelectContent>
                      {getCategories().map(c => (
                        <SelectItem key={c.id} value={c.id}>{isAr ? c.name_ar : c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder={isAr ? 'نظام التسعير' : 'Pricing Model'} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">{isAr ? 'مجاني بالكامل' : '100% Free'}</SelectItem>
                      <SelectItem value="freemium">{isAr ? 'فريميوم (محدود)' : 'Freemium'}</SelectItem>
                      <SelectItem value="paid">{isAr ? 'مدفوع / اشتراك' : 'Paid Plan'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder={isAr ? 'منحنى الصعوبة' : 'Learning Curve'} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{isAr ? 'سهل / للمبتدئين' : 'Beginner Friendly'}</SelectItem>
                      <SelectItem value="intermediate">{isAr ? 'متوسط الخبرة' : 'Intermediate'}</SelectItem>
                      <SelectItem value="advanced">{isAr ? 'محترف / متقدم' : 'Advanced Professional'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="sm:col-span-2 pt-2">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-6">{isAr ? 'حفظ الأداة في النظام' : 'Save & Publish Tool'}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Grid View Table Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                layout
              >
                <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 border-b border-slate-50 dark:border-slate-800/60">
                    <CardTitle className="text-base flex items-center justify-between gap-2 font-bold text-slate-900 dark:text-white">
                      <span className="truncate">{isAr ? tool.name_ar : tool.name}</span>
                      <div className="flex gap-1.5 shrink-0">
                        <Button variant="outline" size="sm" className="h-8 text-xs rounded-md">{isAr ? 'تعديل' : 'Edit'}</Button>
                        <Button variant="destructive" size="sm" className="h-8 text-xs rounded-md" onClick={() => handleDelete(tool.id)}>{isAr ? 'حذف' : 'Delete'}</Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {isAr ? tool.description_ar : tool.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader>
              <CardTitle className="font-bold text-xl">{isAr ? 'التصنيفات المتاحة حالياً' : 'Platform Categories'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {getCategories().map(cat => (
                  <Card key={cat.id} className="p-5 text-center bg-slate-50 dark:bg-slate-800/40 border-0 rounded-xl">
                    <div className="text-4xl mb-2 select-none">{cat.icon}</div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{isAr ? cat.name_ar : cat.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{cat.tool_count} {isAr ? 'أداة مسجلة' : 'tools'}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-slate-400">
            <p className="text-sm">{isAr ? 'بوابة إدارة اشتراكات المستخدمين والـ Stripe قيد الربط النهائي...' : 'User management and Stripe analytics pipeline integration coming soon...'}</p>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-slate-400">
            <p className="text-sm">{isAr ? 'بوابة الموافقة وحذف مراجعات وتقييمات العملاء...' : 'User reviews approvals dashboard module coming soon...'}</p>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
