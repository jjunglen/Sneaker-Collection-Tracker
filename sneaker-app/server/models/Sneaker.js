const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Sneaker = sequelize.define("Sneaker", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("owned", "wanted", "sold"),
        allowNull: false,
        defaultValue: "owned",
    },
    purchase_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    current_value: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    condition: {
        type: DataTypes.ENUM("Brand New", "Pre-owned"),
        allowNull: true,
    },
}, {
    tableName: "sneakers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,

})

module.exports = Sneaker;
