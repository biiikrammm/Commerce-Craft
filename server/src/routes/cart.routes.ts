import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => cartController.getCart(req, res));
router.post('/add', (req, res) => cartController.addToCart(req, res));
router.put('/update', (req, res) => cartController.updateCart(req, res));
router.delete('/:productId', (req, res) => cartController.removeFromCart(req, res));
router.delete('/', (req, res) => cartController.clearCart(req, res));

export default router;
