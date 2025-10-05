import fs from "fs/promises";
import { join } from "path";
import { getDirname } from "./pathUtils.js";

export async function deleteFileByName(fileName){
    try {
        const __dirname = getDirname(import.meta.url);
        
        if(fileName){
            const filePath = "../../uploads";
            await fs.unlink(join(__dirname, filePath, fileName));
        }
    } catch (error) {
        throw error;
    }
}