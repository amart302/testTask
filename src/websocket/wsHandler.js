import { WebSocketServer } from "ws";
import { createMessage, getMessages } from "../controllers/messages.controller.js";

const clients = new Map();

export const setupWebSocket = async(PORT) => {
  const wss = new WebSocketServer({ port: PORT });

  wss.on("connection", async(ws) => {
    const clientId = generateClientId();
    
    clients.set(ws, {
      id: clientId,
      connectedAt: new Date()
    });

    console.log("Подключен клиент:", clientId);
    
    try {
      const messages = await getMessages();
      ws.send(JSON.stringify({ data: messages }));
    } catch(error){
      console.error("Ошибка загрузки истории:", error);
    }

    ws.on("message", async(message) => {
      try {
        const parseMessage = JSON.parse(message);
        
        const savedMessage = await createMessage(parseMessage);

        broadcast(JSON.stringify({
          data: savedMessage
        }));

      } catch(error){
        console.error("Ошибка обработки сообщения:", error);
        ws.send(JSON.stringify({ message: "Не удалось отправить сообщение" }));
      }
    });

    ws.on("close",() => {
      handleClientDisconnect(ws);
    });

    ws.on("error",(error) => {
      console.error("WebSocket ошибка:", error);
      handleClientDisconnect(ws);
    });
  });
};

function generateClientId(){
  return Math.random().toString(36).substr(2, 9);
}

function handleClientDisconnect(ws){
  const client = clients.get(ws);
  
  if(client){
    console.log("Отключен клиент:", client.id);
    clients.delete(ws);
  }
}

function broadcast(data){
  clients.forEach((client, ws) => {
    if(ws.readyState === ws.OPEN){
      ws.send(data);
    }
  });
}