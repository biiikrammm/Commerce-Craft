import { supabase } from '../lib/supabase.js';
import { cartService } from './cart.service.js';
import type { Order, OrderWithItems, CreateOrderInput } from '../types/index.js';

export class OrderService {
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  async createOrder(input: CreateOrderInput, userId?: string, sessionId?: string): Promise<OrderWithItems> {
    // Get cart items
    const cart = await cartService.getCart(userId, sessionId);

    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Validate all products exist
    for (const item of input.items) {
      const { data: product } = await supabase
        .from('products')
        .select('id, price')
        .eq('id', item.product_id)
        .single();

      if (!product) {
        throw new Error(`Product ${item.product_id} not found`);
      }
    }

    // Calculate total
    const total = cart.items.reduce((sum: number, item: any) => 
      sum + (item.product.price * item.quantity), 0
    );

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: this.generateOrderNumber(),
        total_amount: total,
        shipping_first_name: input.shipping.first_name,
        shipping_last_name: input.shipping.last_name,
        shipping_email: input.shipping.email,
        shipping_address: input.shipping.address,
        shipping_city: input.shipping.city,
        shipping_state: input.shipping.state,
        shipping_postal_code: input.shipping.postal_code,
        shipping_country: input.shipping.country,
        shipping_phone: input.shipping.phone,
        payment_method: input.payment_method,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = cart.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product.name,
      product_image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }));

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    // Clear cart
    await cartService.clearCart(userId, sessionId);

    return {
      ...order,
      items,
    } as OrderWithItems;
  }

  async getOrderById(orderId: string, userId?: string): Promise<OrderWithItems | null> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('id', orderId);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data as OrderWithItems;
  }

  async getUserOrders(userId: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as OrderWithItems[];
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  }
}

export const orderService = new OrderService();
