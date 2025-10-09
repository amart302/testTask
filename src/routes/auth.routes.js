import { Router } from "express";
import { signup, signin } from '../controllers/auth.controller.js';
import { signInValidation, signUpValidation } from "../middleware/validation.middleware.js";
import errorHandler from "../middleware/errorHandler.middleware.js";

const router = new Router();

router.post("/signup", signUpValidation, errorHandler, signup);
router.post("/signin", signInValidation, errorHandler, signin);

export default router;