import { File } from "../models/File.js";
import { User } from "../models/User.js";
import { deleteFileByName } from "../utils/fileUtils.js";

export async function addFile(req, res){
    try {
        const { id } = req.user;
        const {
            originalname,
            filename,
            path,
            mimetype,
            size
        } = req.file;
        
        await File.create({
            userId: id,
            originalName: originalname,
            fileName: filename,
            path,
            mimeType: mimetype,
            size
        });

        res.status(200).json({ message: "Файл успешно добавлен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось добавить файл" });
    }
}

export async function deleteFile(req, res){
    try {
        // const { id } = req.user;
        const { fileName } = req.params;

        // const user = await User.findByPk(id);
        
        // if(!user){
        //     return res.status(404).json({ message: "Пользователь не найден" });
        // }

        await deleteFileByName(fileName);

        res.status(200).json({ message: "Файл успешно удален" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось удалить файл" });
    }
}