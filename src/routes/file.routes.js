import { Router } from "express";
import { addFile, deleteFile } from '../controllers/file.controller.js';
import errorHandler from "../middleware/errorHandler.middleware.js";
import { createUploadMiddleware } from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

// router.get("/", signUpValidation, errorHandler, signup);
router.post("/", authMiddleware, createUploadMiddleware("file"), addFile);
router.delete("/:fileName", deleteFile);

export default router;