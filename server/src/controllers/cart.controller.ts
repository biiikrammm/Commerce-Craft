import type { Response } from 'express';
import { cartService } from '../services/cart.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import { z } from 'zod';

const addToCartSchema = z.object({
  product_id: z.string(),
  quantity: z.number().int().positive().default(1),
});

const updateCartSchema = z.object({
  product_id: z.string(),
  quantity: z.number().int().min(0),
});

export class CartController {
  async getCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const cart = await cartService.getCart(req.userId, req.sessionId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to get cart' });
    }
  }

  async addToCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const validatedData = addToCartSchema.parse(req.body);
      
      await cartService.addToCart(
        validatedData.product_id,
        validatedData.quantity,
        req.userId,
        req.sessionId
      );
      
      const cart = await cartService.getCart(req.userId, req.sessionId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(400).json({ error: error.message || 'Failed to add to cart' });
    }
  }

  async updateCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const validatedData = updateCartSchema.parse(req.body);
      
      await cartService.updateCartItem(
        validatedData.product_id,
        validatedData.quantity,
        req.userId,
        req.sessionId
      );
      
      const cart = await cartService.getCart(req.userId, req.sessionId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(400).json({ error: error.message || 'Failed to update cart' });
    }
  }

  async removeFromCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      
      await cartService.removeFromCart(productId, req.userId, req.sessionId);
      
      const cart = await cartService.getCart(req.userId, req.sessionId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to remove from cart' });
    }
  }

  async clearCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      await cartService.clearCart(req.userId, req.sessionId);
      
      res.json({
        success: true,
        message: 'Cart cleared successfully',
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to clear cart' });
    }
  }
}

export const cartController = new CartController();
