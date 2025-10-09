import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Product = sequelize.define("Product", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        file: { type: DataTypes.STRING(255), allowNull: false }
    }, {
        tableName: "products",
        timestamps: true,
        indexes: [
            { fields: ["userId"] }
        ]
    }
)