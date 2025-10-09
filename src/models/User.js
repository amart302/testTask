import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(255), unique: true, allowNull: false, validate: { isEmail: true } },
        fullName: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.ENUM("admin", "user"), allowNull: true, defaultValue: "user" },
        password: { type: DataTypes.STRING(255), allowNull: false, validate: { len: [ 6, 255 ] } }
    }, {
        tableName: "users",
        timestamps: true
    }
)