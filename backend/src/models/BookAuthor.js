const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BookAuthor = sequelize.define(
  "BookAuthor",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "book_authors",
    timestamps: false,
  }
);

module.exports = BookAuthor;