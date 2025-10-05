import bcrypt from "bcryptjs";

export const hashingPassword = (password) => bcrypt.hashSync(password, 8);
export const verifyPassword = (inputPassword, hashedPassword) => bcrypt.compareSync(inputPassword, hashedPassword);