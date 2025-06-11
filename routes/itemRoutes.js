import express from "express";
import { createItem, getItems, getItemById, deleteItem } from "../controllers/itemController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/items", upload.single("image"), createItem);       // Create new item
router.get("/items", getItems);           // Get all items
router.get("/items/:id", getItemById);    // Get item by ID
router.delete("/items/:id", deleteItem);

export default router;