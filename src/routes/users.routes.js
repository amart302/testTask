import { Router } from "express";
import { getUserProfile } from '../controllers/users.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/profile", authMiddleware, getUserProfile);

export default router;