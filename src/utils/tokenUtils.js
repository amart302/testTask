import jwt from "jsonwebtoken";

export const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
}