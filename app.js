import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.post("/api/save-user", async (req, res) => {
  const { name, email, photoURL, firebaseUid } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, photoURL, firebaseUid },
      { new: true, upsert: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
