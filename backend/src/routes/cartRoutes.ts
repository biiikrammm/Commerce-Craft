import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';
import { cartValidation } from '../middleware/validators';

const router = express.Router();

router.get('/', getCart);
router.post('/add', cartValidation.addItem, addToCart);
router.put('/update', cartValidation.updateItem, updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;
