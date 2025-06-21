import express from 'express';
import { placeOrder, getOrders, verifyOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';
import { verifyAdmin } from '../middleware/verifyToken.js';
// import { placeOrder } from '../controllers/orderController,js';

const router = express.Router();

router.post('/orders',authenticate, placeOrder);
router.get('/orders', authenticate, getOrders);
router.post('/orders/verify', verifyOrder);
router.get('/orders/all', verifyAdmin, getAllOrders);
router.put('/orders/:order_id/status', verifyAdmin, updateOrderStatus);

export default router;