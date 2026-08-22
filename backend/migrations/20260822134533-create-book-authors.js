"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("book_authors", {
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "books",
          key: "id",
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE",

        primaryKey: true,
      },

      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "authors",
          key: "id",
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE",

        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("book_authors");
  },
};