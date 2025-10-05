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
        const { fullName, email } = req.body;

        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        await user.update({
            fullName,
            email
        });

        res.status(200).json({ message: "Данные пользователя успешно обновлен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось изменить данные пользователя" });
    }
}

export async function changePassword(req, res){
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const validPassword = verifyPassword(oldPassword, user.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный пароль" });
        }

        const hashPassword = hashingPassword(newPassword);
        await user.update({
            password: hashPassword
        });

        res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось сменить пароль" });
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