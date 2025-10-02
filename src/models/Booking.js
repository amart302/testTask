import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Room } from "./Room.js";

export const Booking = sequelize.define("Booking", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER },
        phoneNumber: { type: DataTypes.STRING(12) },
        roomId: { type: DataTypes.INTEGER, allowNull: false },
        dateOfEntry: { type: DataTypes.DATEONLY, allowNull: false },
        departureDate: { type: DataTypes.DATEONLY, allowNull: false },
        adults: { type: DataTypes.INTEGER, allowNull: false },
        children: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM("active", "pending"), defaultValue: "pending" }
    }, {
        tableName: "bookings",
        timestamps: false
    }
);

Booking.associate = () => {
    Booking.belongsTo(User, { foreignKey: "userId" });
    Booking.belongsTo(Room, { foreignKey: "roomId" });
};