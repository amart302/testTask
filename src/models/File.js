import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const File = sequelize.define("File", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        originalName: { type: DataTypes.STRING(500), allowNull: false },
        fileName: { type: DataTypes.STRING(500), unique: true, allowNull: false },
        path: { type: DataTypes.STRING(100), allowNull: false },
        mimeType: { type: DataTypes.STRING(100), allowNull: false },
        size: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: "files",
        timestamps: true,
        indexes: [
            { fields: ["userId"] },
            { fields: ["fileName"] }
        ]
    }
);