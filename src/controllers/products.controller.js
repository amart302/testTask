import { Product } from "../models/Product.js";
import { deleteFileByName } from "../utils/fileUtils.js";

export async function getProducts(req, res){
    try {
        const { id } = req.user;

        const products = await Product.findAll({ where: { userId: id } });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось найти продукты пользователя" });
    }
}

export async function getProduct(req, res){
    try {
        const { id } = req.user;
        const { productId } = req.params;

        const product = await Product.findByPk(productId);

        if(!product){
            return res.status(404).json({ message: "Продукт не найден" });
        }

        if(product.userId !== id){
            return res.status(404).json({ message: "Отказано в доступе" });
        }
        
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось найти продукты пользователя" });
    }
}

export async function createProduct(req, res){
    try {
        const { id } = req.user;
        const {
            title,
            description
        } = req.body;
        
        await Product.create({
            userId: id,
            title,
            description,
            file: req.file.filename
        });

        res.status(200).json({ message: "Продукт успешно добавлен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось добавить продукт" });
    }
}

export async function updateProduct(req, res){
    try {
        const { id } = req.user;
        const { productId } = req.params;
        const {
            title,
            description
        } = req.body;

        const product = await Product.findByPk(productId);
        
        if(!product){
            return res.status(404).json({ message: "Продукт не найден" });
        }

        if(product.userId !== id){
            return res.status(404).json({ message: "Отказано в доступе" });
        }

        await product.update({
            title,
            description
        });

        res.status(200).json({ message: "Данные продукта обновлены" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось обновить продукт" });
    }
}

export async function deleteProduct(req, res){
    try {
        const { id } = req.user;
        const { productId } = req.params;

        const product = await Product.findByPk(productId);
        
        if(!product){
            return res.status(404).json({ message: "Продукт не найден" });
        }

        if(product.userId !== id){
            return res.status(404).json({ message: "Отказано в доступе" });
        }

        await product.destroy();
        await deleteFileByName(product.file);

        res.status(200).json({ message: "Продукт успешно удален" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось удалить продукт" });
    }
}