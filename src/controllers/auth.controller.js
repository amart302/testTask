import "dotenv/config";
import { User } from "../models/User.js";
import { hashingPassword, verifyPassword } from "../utils/passwordUtils.js";
import { generateAccessToken } from "../utils/tokenUtils.js";

export async function signup(req, res){
    try {
        const { fullName, email, password, } = req.body;
        const hashPassword = hashingPassword(password);

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
}

export async function signin(req, res){
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if(!user){
            return res.status(401).json({ message: "Не правильный email или пароль! Повторите вход" });
        }

        const validPassword = verifyPassword(password, user.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный email или пароль! Повторите вход" });
        }

        const token = generateAccessToken(user.id, user.role);
        res.status(200).json({ message: "Успешный вход", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка авторизации" });
    }
}