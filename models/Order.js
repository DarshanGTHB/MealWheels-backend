import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
                quantity: { type: Number, required: true },
            },
        ],
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
        status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;