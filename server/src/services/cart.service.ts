import { supabase } from '../lib/supabase.js';
import type { Cart, CartItem, Product, UpdateCartItemInput } from '../types/index.js';

export class CartService {
  async getOrCreateCart(userId?: string, sessionId?: string): Promise<string> {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    // Try to find existing cart
    let query = supabase.from('carts').select('id');
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_id', sessionId);
    }

    const { data: existingCart } = await query.single();

    if (existingCart) {
      return existingCart.id;
    }

    // Create new cart
    const { data, error } = await supabase
      .from('carts')
      .insert({ user_id: userId, session_id: sessionId })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async getCart(userId?: string, sessionId?: string): Promise<{ items: (CartItem & { product: Product })[], total: number }> {
    const cartId = await this.getOrCreateCart(userId, sessionId);

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('cart_id', cartId);

    if (error) throw error;

    const items = (data || []).map((item: any) => ({
      id: item.id,
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: item.quantity,
      created_at: item.created_at,
      updated_at: item.updated_at,
      product: item.product,
    }));

    const total = items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

    return { items, total };
  }

  async addToCart(productId: string, quantity: number, userId?: string, sessionId?: string): Promise<void> {
    const cartId = await this.getOrCreateCart(userId, sessionId);

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      throw new Error('Product not found');
    }

    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);

      if (error) throw error;
    } else {
      // Add new item
      const { error } = await supabase
        .from('cart_items')
        .insert({ cart_id: cartId, product_id: productId, quantity });

      if (error) throw error;
    }
  }

  async updateCartItem(productId: string, quantity: number, userId?: string, sessionId?: string): Promise<void> {
    const cartId = await this.getOrCreateCart(userId, sessionId);

    if (quantity <= 0) {
      await this.removeFromCart(productId, userId, sessionId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (error) throw error;
  }

  async removeFromCart(productId: string, userId?: string, sessionId?: string): Promise<void> {
    const cartId = await this.getOrCreateCart(userId, sessionId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (error) throw error;
  }

  async clearCart(userId?: string, sessionId?: string): Promise<void> {
    const cartId = await this.getOrCreateCart(userId, sessionId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
  }
}

export const cartService = new CartService();
