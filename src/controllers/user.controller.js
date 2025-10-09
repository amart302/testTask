import { User } from "../models/User.js";
import { hashingPassword, verifyPassword } from "../utils/passwordUtils.js";

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
}

export async function updateUserData(req, res){
    try {
        const { id } = req.user;
        const { fullName, email, oldPassword, newPassword } = req.body;

        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if(oldPassword === newPassword){
            return res.status(400).json({ message: "Новый пароль не должен совпадать со старым" });
        }

        const validPassword = verifyPassword(oldPassword, user.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный пароль" });
        }

        const hashPassword = hashingPassword(newPassword);

        await user.update({
            fullName,
            email,
            password: hashPassword
        });

        res.status(200).json({ message: "Данные пользователя обновлены" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось изменить данные пользователя" });
    }
}

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
}