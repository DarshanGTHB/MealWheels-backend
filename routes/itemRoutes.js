import express from "express";
import { createItem, getItems, getItemById, deleteItem, updateItem } from "../controllers/itemController.js";
import upload from "../middleware/upload.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/items", verifyAdmin, upload.single("image"), createItem);       // Create new item
router.get("/items", getItems);           // Get all items
router.get("/items/:id", getItemById);    // Get item by ID
router.delete("/items/:id", deleteItem);  // Delete item
router.put("/items/:id", upload.single("image"), updateItem);    // Update item

export default router;