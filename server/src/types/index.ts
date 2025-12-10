export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: string;
  user_id?: string;
  session_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartWithItems extends Cart {
  items: (CartItem & { product: Product })[];
}

export interface Order {
  id: string;
  user_id?: string;
  order_number: string;
  status: string;
  total_amount: number;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_phone?: string;
  payment_method?: string;
  payment_status: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_image?: string;
  price: number;
  quantity: number;
  subtotal: number;
  created_at: Date;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: Date;
  is_active: boolean;
}

export interface CreateUserInput {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateOrderInput {
  items: {
    product_id: string;
    quantity: number;
  }[];
  shipping: {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  payment_method?: string;
}

export interface UpdateCartItemInput {
  product_id: string;
  quantity: number;
}
