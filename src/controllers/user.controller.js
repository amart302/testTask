import { User } from "../models/User.js";

export async function getUserData(req, res){
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: [ "id", "fullName", "email" ]
        });
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось получить данные пользователя" });
    }
};

export async function changeUserData(req, res){
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось изменить данные пользователя" });
    }
};

export async function deleteUser(req, res){
    try {
        const { id } = req.user;

        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        await user.destroy();

        res.status(200).json({ message: "Пользователь успешно удален" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось удалить пользователя" });
    }
};