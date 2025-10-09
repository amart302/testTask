import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Product } from "./Product.js";
import { Message } from "./Message.js";

const db = {
    User,
    Product,
    Message,
    sequelize
};

db.associate = () => {
    db.User.hasMany(db.Product, { 
        foreignKey: "userId",
        as: "products",
        onDelete: "CASCADE"
    });
    
    db.Product.belongsTo(db.User, { 
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
    });

    db.User.hasMany(db.Message, {
        foreignKey: "userId",
        as: "messages",
        onDelete: "CASCADE"
    });

    db.Message.belongsTo(db.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
    });
};

export default db;