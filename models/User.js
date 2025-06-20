import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String, // Use Firebase UID as MongoDB document ID
    required: true,
  },
  name: String,
  email: {
    type: String,
    unique: true,
  },
  photoURL: String,
  cart: {
    type: Object,
    default: {},
  },
  orders : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: []
    }
  ]
}, { _id: false }); // Disable automatic ObjectId

export default mongoose.model("User", userSchema);
