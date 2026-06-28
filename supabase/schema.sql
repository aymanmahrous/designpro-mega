-- ============================================
-- قاعدة بيانات منصة DesignPro Mega
-- ============================================

-- 1. جدول المستخدمين (يمتد من Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  name_ar TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  bio TEXT,
  bio_ar TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول التصنيفات
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  description_ar TEXT,
  color TEXT DEFAULT '#059669',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول الأدوات (أكثر من 70 أداة)
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  logo_url TEXT,
  website_url TEXT,
  affiliate_url TEXT,
  pricing TEXT DEFAULT 'free' CHECK (pricing IN ('free', 'freemium', 'paid')),
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  features TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  users_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  gallery_images TEXT[] DEFAULT '{}',
  video_url TEXT,
  platform TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  downloads INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. جدول المراجعات والتقييمات
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  title_ar TEXT,
  comment TEXT,
  comment_ar TEXT,
  pros TEXT,
  cons TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);

-- 5. جدول المدونة
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_ar TEXT,
  content TEXT,
  content_ar TEXT,
  image_url TEXT,
  category TEXT,
  author_id UUID REFERENCES public.users(id),
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. جدول المقارنات المحفوظة
CREATE TABLE IF NOT EXISTS public.comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT,
  name_ar TEXT,
  tool_ids UUID[] NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. جدول المعارض / الإلهام
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  title TEXT,
  title_ar TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  likes_count INT DEFAULT 0,
  downloads_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. جدول الأسئلة والإجابات (Community Q&A)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  body TEXT,
  body_ar TEXT,
  is_resolved BOOLEAN DEFAULT false,
  votes_count INT DEFAULT 0,
  answers_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  body TEXT,
  body_ar TEXT,
  is_accepted BOOLEAN DEFAULT false,
  votes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. جدول الإحصائيات والتحليلات
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  downloads INT DEFAULT 0,
  saves INT DEFAULT 0,
  UNIQUE(tool_id, date)
);

-- 10. جدول خطط الأسعار
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  period TEXT DEFAULT 'monthly' CHECK (period IN ('monthly', 'yearly')),
  features TEXT[] DEFAULT '{}',
  features_ar TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON public.tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON public.tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_tools_is_new ON public.tools(is_new);
CREATE INDEX IF NOT EXISTS idx_reviews_tool_id ON public.reviews(tool_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_analytics_tool_date ON public.analytics(tool_id, date);

-- تفعيل Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان الأساسية
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);

-- إدراج البيانات الأولية للتصنيفات الـ 10 الرئيسية
INSERT INTO public.categories (name, name_ar, slug, icon, description, description_ar) VALUES
  ('Image Design', 'تصميم الصور', 'image-design', '🖼️', 'Tools for creating and editing images', 'أدوات إنشاء وتحرير الصور'),
  ('Video Editing', 'مونتاج فيديو', 'video-editing', '🎬', 'Video editing and production tools', 'أدوات مونتاج وإنتاج الفيديو'),
  ('Motion Graphics', 'موشن جرافيك', 'motion-graphics', '🎞️', 'Animation and motion graphics tools', 'أدوات الرسوم المتحركة'),
  ('Printing', 'طباعة', 'printing', '🖨️', 'Print design and prepress tools', 'أدوات تصميم الطباعة'),
  ('Advertising', 'دعاية وإعلان', 'advertising', '📢', 'Advertising design and campaign tools', 'أدوات تصميم الإعلانات'),
  ('Audio Editing', 'تحرير الصوت', 'audio-editing', '🎵', 'Audio recording and editing tools', 'أدوات تسجيل وتحرير الصوت'),
  ('Logo & Branding', 'تصميم الشعارات', 'logo-branding', '🔤', 'Logo design and brand identity tools', 'أدوات تصميم الشعارات والهوية'),
  ('UI/UX Design', 'تصميم واجهات', 'ui-ux-design', '📱', 'User interface and experience tools', 'أدوات تصميم واجهات المستخدم'),
  ('Marketing Tools', 'أدوات تسويق', 'marketing-tools', '📊', 'Digital marketing and analytics tools', 'أدوات التسويق الرقمي والتحليلات'),
  ('AI Creative', 'ذكاء اصطناعي', 'ai-creative', '🤖', 'AI-powered creative tools', 'أدوات إبداعية بالذكاء الاصطناعي')
ON CONFLICT (slug) DO NOTHING;
-- ============================================
-- دوال الـ RPC الذكية للتحليلات والتفاعلات
-- ============================================

CREATE OR REPLACE FUNCTION increment_tool_views(p_tool_id UUID, p_date DATE)
RETURNS void AS \
BEGIN
  INSERT INTO analytics (tool_id, date, views)
  VALUES (p_tool_id, p_date, 1)
  ON CONFLICT (tool_id, date)
  DO UPDATE SET views = analytics.views + 1;
END;
\ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_gallery_likes(p_item_id UUID)
RETURNS void AS \
BEGIN
  UPDATE gallery_items SET likes_count = likes_count + 1 WHERE id = p_item_id;
END;
\ LANGUAGE plpgsql;
