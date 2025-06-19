import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
// import { placeOrder } from '../controllers/orderController,js';

const router = express.Router();

router.post('/order/place-order', placeOrder);

export default router;