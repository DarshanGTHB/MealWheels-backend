import admin from "../config/firebase.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded.admin) return res.status(403).json({ error: "Admins only" });

    req.user = decoded; // Optional: pass user data to next middleware
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token" });
  }
};
