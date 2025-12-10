import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import { authMiddleware, requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res) => orderController.createOrder(req, res));
router.get('/', requireAuth, (req, res) => orderController.getUserOrders(req, res));
router.get('/:id', (req, res) => orderController.getOrderById(req, res));

export default router;
