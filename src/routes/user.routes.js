import { Router } from "express";
import { getUserData, deleteUser } from '../controllers/user.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";
import errorHandler from "../middleware/errorHandler.middleware.js";

const router = new Router();

router.get("/", authMiddleware, getUserData);
router.delete("/", authMiddleware, deleteUser);

export default router;