import { Message } from "../models/Message.js";

export async function getMessages(){
    try {
        return await Message.findAll({
            order: [[ "createdAt", "ASC" ]],
            limit: 50
        });
    } catch (error) {
        console.error("Ошибка получения сообщений:", error);
        throw error;
    }
}

export async function createMessage(data){
    try {
        console.log(data);
        
        return await Message.create(data);
    } catch (error) {
        throw error;
    }
}