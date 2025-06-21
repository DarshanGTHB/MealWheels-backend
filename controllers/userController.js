import User from "../models/User.js";

export const saveUser = async (req, res) => {
  const { name, email, photoURL, firebaseUid } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      firebaseUid,
      { name, email, photoURL },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single user by email
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
