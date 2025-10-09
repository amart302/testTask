import express from "express";
import cors from "cors";
import "dotenv/config";
import { getDirname } from "./utils/pathUtils.js";
import path from "path";
import { startConnection } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productsRoutes from "./routes/products.routes.js";
import db from "./models/index.js";
import { setupWebSocket } from "./websocket/wsHandler.js";

const app = express();
const __dirname = getDirname(import.meta.url);

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({
    limit: "10mb",
    extended: true
}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/products", productsRoutes);

const PORT = 3000;

setupWebSocket(PORT);

const startServer = async () => {
    try {
        console.clear();

        db.associate();
        await db.sequelize.sync();
        console.log("Ассоциации установлены, синхронизация завершена");

        await startConnection();

        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${ PORT }`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();