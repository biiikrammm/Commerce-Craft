import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';

const router = Router();

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/categories', (req, res) => productController.getCategories(req, res));
router.get('/search', (req, res) => productController.searchProducts(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));

export default router;
