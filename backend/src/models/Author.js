const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: "authors",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Author;