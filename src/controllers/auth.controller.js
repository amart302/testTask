import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";

const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
};

export async function signup(req, res) {
    try {
        const { fullName, email, password, } = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);

        const user = await User.findOne({
            where: {
                email
            }
        });

        if(user){
            return res.status(409).json({ message: "Пользователь с такой почтой уже существует" });
        }
        
        await User.create({
            fullName,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "Успешная регистрация" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка регистрации" });
    }
};

export async function signin(req, res) {
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if(!user){
            return res.status(401).json({ message: "Не правильный email или пароль! Повторите вход" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный email или пароль! Повторите вход" });
        }

        const token = generateAccessToken(user.id, user.role);
        res.status(200).json({ message: "Успешный вход", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка авторизации" });
    }
};