export interface Tool {
  id: string; 
  name: string; 
  name_ar: string;
  description: string; 
  description_ar: string;
  category: string; 
  category_ar: string;
  category_slug: string;
  logo_url: string; 
  website_url: string; 
  affiliate_url?: string;
  pricing: 'free' | 'freemium' | 'paid';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features_en: string[];
  features_ar: string[];
  rating: number; 
  reviews_count: number; 
  users_count: number;
  is_featured: boolean; 
  is_new: boolean;
  created_at: string; 
  updated_at: string;
  gallery_images?: string[]; 
  video_url?: string; 
  downloads?: number;
  platform?: string[]; 
  languages?: string[];
}

export interface Category {
  id: string; 
  name: string; 
  name_ar: string; 
  slug: string;
  icon: string; 
  description?: string; 
  description_ar?: string;
  tool_count: number;
}

export interface Review {
  id: string; 
  tool_id: string; 
  user_id: string;
  user_name: string; 
  user_avatar?: string;
  rating: number; 
  comment: string; 
  created_at: string;
}

export interface BlogPost {
  id: string; 
  title: string; 
  title_ar: string; 
  slug: string;
  excerpt: string; 
  excerpt_ar: string; 
  content: string; 
  content_ar: string;
  image_url: string; 
  category: string; 
  category_ar: string;
  author: string;
  tags_en: string[];
  tags_ar: string[]; 
  published_at: string; 
  is_featured: boolean;
}

export interface PricingPlan {
  id: string; 
  name: string; 
  name_ar: string;
  price: number; 
  currency: string; 
  period: 'monthly' | 'yearly';
  features_en: string[];
  features_ar: string[];
  is_popular: boolean; 
  stripe_price_id?: string;
}

export interface TemplateStyle {
  id: string; 
  name: string; 
  name_ar: string;
  primaryColor: string; 
  bgColor: string; 
  cardStyle: string;
  animationStyle: string;
}

// ==========================================
// الأنواع الجديدة المضافة (المستخدمين والمجتمع)
// ==========================================

export interface User {
  id: string;
  name?: string;
  name_ar?: string;
  email: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'moderator';
  bio?: string;
  bio_ar?: string;
  website?: string;
  created_at: string;
}

export interface ReviewWithUser extends Review {
  users: { name: string; avatar_url: string } | null;
}

export interface Question {
  id: string;
  tool_id: string;
  user_id: string;
  title: string;
  title_ar: string;
  body?: string;
  body_ar?: string;
  is_resolved: boolean;
  answers_count: number;
  created_at: string;
  users?: { name: string; avatar_url: string };
  answers?: Answer[];
}

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  body?: string;
  body_ar?: string;
  is_accepted: boolean;
  created_at: string;
  users?: { name: string; avatar_url: string };
}

export interface DashboardStats {
  tools_count: number;
  categories_count: number;
  users_count: number;
  reviews_count: number;
}