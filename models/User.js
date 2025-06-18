import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photoURL: String,
  firebaseUid: String,
  cart: { type: Object, default: {} },
});

export default mongoose.model("User", userSchema);
