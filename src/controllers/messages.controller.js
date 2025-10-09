import { Message } from "../models/Message.js";

export async function getMessages(){
    try {
        return await Message.findAll({
            limit: 50
        });
    } catch (error) {
        console.error("Ошибка получения сообщений:", error);
    }
}

export async function createMessage(data){
    try {
        const { userId, text } = data;
        return await Message.create({
            userId,
            text
        });
    } catch (error) {
        console.error("Ошибка создания сообщения:", error);
    }
}