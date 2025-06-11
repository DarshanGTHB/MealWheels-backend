import express from "express";
import { saveUser } from "../controllers/userController.js";
import { getUsers } from "../controllers/userController.js";
import { getUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.post("/save-user", saveUser);
router.get("/users", getUsers);
router.get("/users/:email", getUserByEmail);

export default router;