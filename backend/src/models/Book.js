const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isbn: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Book;