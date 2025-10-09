import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Message = sequelize.define("Message", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        text: { type: DataTypes.TEXT, allowNull: false }
    }, {
        tableName: "messages",
        timestamps: true,
        indexes: [
            { fields: ["userId"] }
        ]
    }
)