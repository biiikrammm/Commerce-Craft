import { supabase } from '../lib/supabase.js';
import type { Product } from '../types/index.js';

export class ProductService {
  async getAllProducts(category?: string): Promise<Product[]> {
    let query = supabase.from('products').select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  }

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return data as Product;
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category');
    
    if (error) throw error;
    
    const categories: string[] = Array.from(new Set(data.map((p: any) => p.category as string)));
    return ['All', ...categories];
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (error) throw error;
    return data as Product[];
  }
}

export const productService = new ProductService();
