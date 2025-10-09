import { Router } from "express";
import { getUserData, updateUserData, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import errorHandler from "../middleware/errorHandler.middleware.js";
import { updateUserValidation } from "../middleware/validation.middleware.js";

const router = new Router();

router.get("/profile", authMiddleware, getUserData);
router.put("/profile", updateUserValidation, errorHandler, authMiddleware, updateUserData);
router.delete("/profile", authMiddleware, deleteUser);

export default router;