// stripeController.js
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import User from "../models/User.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const { items } = req.body;
  // console.log("body : " , items)
  // console.log(req.user);

  // const items = req.body.items
  const orderItems = items.map((item) => ({
    item: item._id,
    quantity: item.quantity,
  }));

  // const user = req.user;
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const paymentStatus = "unpaid"; // Initial payment status
  const status = "pending"; // Initial order status

  // Create a new order
  const newOrder = new Order({
    user: req.user.user_id, // Assuming user_id is part of the item object
    items: orderItems,
    totalAmount,
    paymentStatus,
    status,
  });

  await newOrder.save();
  await User.findByIdAndUpdate(req.user.user_id, {
    $push: { orders: newOrder._id }, // Assuming User model has an 'orders' field
    $set: { cart: {} }, // Clear the cart after placing the order
  });
  // Here you would typically save the order to your databaseo    r

  // console.log(items[0].name, items[0].price, items[0].quantity)
  // const newOrder =

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.quantity,
      })),
      success_url:
        "http://localhost:5173/verify?success=true&order_id=" + newOrder._id,
      cancel_url:
        "http://localhost:5173/verify?success=false&order_id=" + '#',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).populate({
      path: "orders",
      populate: {
        path: "items.item",
        model: "Item",
      }
    });
    // console.log(user.orders[0].items);

    res.json({ success: true, orders: user.orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



export const verifyOrder = async (req, res) => {
  const { order_id } = req.body;
  // console.log(req.body);
  // console.log("Verifying order with ID:", order_id);
    try {
      const order = await Order.findById(order_id);
      // console.log("Order found:", order);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      } 
      order.paymentStatus = "paid"; // Update payment status
      order.status = "completed"; // Update order status    
      await order.save();
      res.json({ success: true, message: "Order verified successfully", order });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};