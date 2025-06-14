import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  photoURL: String,
  firebaseUid: String,
});

export default mongoose.model("User", userSchema);
