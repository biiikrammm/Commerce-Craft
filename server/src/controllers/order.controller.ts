import type { Response } from 'express';
import { orderService } from '../services/order.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import { z } from 'zod';

const createOrderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string(),
    quantity: z.number().int().positive(),
  })),
  shipping: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    address: z.string(),
    city: z.string(),
    state: z.string().optional(),
    postal_code: z.string(),
    country: z.string(),
    phone: z.string().optional(),
  }),
  payment_method: z.string().optional(),
});

export class OrderController {
  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const validatedData = createOrderSchema.parse(req.body);
      
      const order = await orderService.createOrder(
        validatedData,
        req.userId,
        req.sessionId
      );
      
      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(400).json({ error: error.message || 'Failed to create order' });
    }
  }

  async getOrderById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id, req.userId);
      
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch order' });
    }
  }

  async getUserOrders(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const orders = await orderService.getUserOrders(req.userId);
      
      res.json({
        success: true,
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch orders' });
    }
  }
}

export const orderController = new OrderController();
