import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.get('/:id', protect, getOrderById);
router.get('/', protect, getMyOrders);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
