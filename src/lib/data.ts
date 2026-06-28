import { supabase } from './supabase';
import { Tool, Category } from '@/types/index';

export async function getTools(): Promise<Tool[]> {
  const { data, error } = await supabase.from('tools').select('*');
  if (error) { console.error('Error fetching tools:', error); return []; }
  return data || [];
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const { data, error } = await supabase.from('tools').select('*').eq('is_featured', true);
  if (error) { console.error('Error fetching featured tools:', error); return []; }
  return data || [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) { console.error('Error fetching categories:', error); return []; }
  return data || [];
}