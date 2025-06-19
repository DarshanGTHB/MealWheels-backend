// stripeController.js
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const { items } = req.body;
    console.log("body : " , items)

    // const items = req.body.items 
    const orderItems = items.map(item => ({
      name: item._id,
      quantity: item.quantity,
    }));

    // const user = req.user;
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const paymentStatus = 'unpaid'; // Initial payment status
    const status = 'pending'; // Initial order status

    // Create a new order
    const newOrder = new Order({
      user: items[0]._id, // Assuming user_id is part of the item object
      items: orderItems,
      totalAmount,
      paymentStatus,
      status,
    });

    await newOrder.save();

    // Here you would typically save the order to your databaseo    r

    // console.log(items[0].name, items[0].price, items[0].quantity)
    // const newOrder =

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.quantity,
      })),
      success_url: 'http://localhost:5173/verify?success=true&item_id=' + 'order_id',
      cancel_url: 'http://localhost:5173/verify?success=false&item_id=' + 'order_id',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
