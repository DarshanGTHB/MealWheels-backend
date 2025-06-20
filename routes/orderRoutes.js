import express from 'express';
import { placeOrder, getOrders, verifyOrder } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';
// import { placeOrder } from '../controllers/orderController,js';

const router = express.Router();

router.post('/orders',authenticate, placeOrder);
router.get('/orders', authenticate, getOrders);
router.post('/orders/verify', verifyOrder);

export default router;