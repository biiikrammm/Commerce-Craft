import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabase.js';
import { config } from '../config/index.js';
import type { User, CreateUserInput, LoginInput } from '../types/index.js';

export class AuthService {
  async register(input: CreateUserInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', input.email)
      .single();

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(input.password, 10);

    // Create user
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: input.email,
        password_hash,
        first_name: input.first_name,
        last_name: input.last_name,
      })
      .select()
      .single();

    if (error) throw error;

    const user = data as User;
    const token = this.generateToken(user.id);

    const { password_hash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(input: LoginInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    // Find user
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', input.email)
      .single();

    if (error || !data) {
      throw new Error('Invalid email or password');
    }

    const user = data as User;

    // Verify password
    const isValidPassword = await bcrypt.compare(input.password, user.password_hash);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id);

    const { password_hash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getUserById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data as Omit<User, 'password_hash'>;
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, config.jwt.secret) as { userId: string };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export const authService = new AuthService();
