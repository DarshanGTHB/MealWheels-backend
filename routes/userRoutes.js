import express from "express";
import { getUserById, saveUser } from "../controllers/userController.js";
import { getUsers } from "../controllers/userController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/save-user", saveUser);
router.get("/users", verifyAdmin, getUsers);
router.get("/users/:id", getUserById);

export default router;  