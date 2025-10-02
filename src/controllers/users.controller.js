import { User } from "../models/User.js";

export async function getUserProfile(req, res) {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: [ "id", "firstname", "lastname", "phoneNumber", "email" ]
        });
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось получить данные пользователя" });
    }
};