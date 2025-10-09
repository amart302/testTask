import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { createUploadMiddleware } from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { productValidation } from "../middleware/validation.middleware.js";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware.js";

const router = new Router();

router.get("/", authMiddleware, getProducts);
router.get("/:productId", authMiddleware, getProduct);
router.post("/additem", authMiddleware, createUploadMiddleware("file"), productValidation, errorHandlerMiddleware, createProduct);
router.put("/:productId", authMiddleware, productValidation, errorHandlerMiddleware, updateProduct);
router.delete("/:productId", authMiddleware, deleteProduct);

export default router;