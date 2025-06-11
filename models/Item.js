import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // Store image URL or path
  imagePublicId: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String }
});

export default mongoose.model("Item", itemSchema);