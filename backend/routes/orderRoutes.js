import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
router.route('/').post(protect, addOrderItems);
router.get('/', protect, getMyOrders);
router.get('/admin', protect, isAdmin, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/delivered', protect, isAdmin, updateOrderToDelivered);

export default router;
