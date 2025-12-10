import type { Response } from 'express';
import { productService } from '../services/product.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export class ProductController {
  async getAllProducts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const category = req.query.category as string | undefined;
      const products = await productService.getAllProducts(category);
      
      res.json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch products' });
    }
  }

  async getProductById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch product' });
    }
  }

  async getCategories(req: AuthRequest, res: Response): Promise<void> {
    try {
      const categories = await productService.getCategories();
      
      res.json({
        success: true,
        data: categories,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch categories' });
    }
  }

  async searchProducts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const products = await productService.searchProducts(query);
      
      res.json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to search products' });
    }
  }
}

export const productController = new ProductController();
