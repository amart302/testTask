import { sequelize } from "../db.js";
import { User } from "./User.js";
import { File } from "./File.js";

const db = {
    User,
    File,
    sequelize
};

db.associate = () => {
    db.User.hasMany(db.File, { 
        foreignKey: "userId",
        as: "files",
        onDelete: "CASCADE"
    });
    
    db.File.belongsTo(db.User, { 
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
    });
};

export default db;