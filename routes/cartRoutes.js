import express from "express"
import { addToCart, getCartData, removeFromCart } from "../controllers/cartController.js";
import {authenticate} from "../middleware/authenticate.js";



const router = express.Router();

router.post('/cart/add', authenticate ,addToCart);
router.post('/cart/remove', authenticate, removeFromCart);
router.get('/cart/cartData', authenticate, getCartData);
export default router;