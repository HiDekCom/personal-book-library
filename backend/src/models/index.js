const Book = require("./Book");
const Author = require("./Author");
const Category = require("./Category");
const User = require("./User");
const BookAuthor = require("./BookAuthor");

// Category 1:N Book
Category.hasMany(Book, {
  foreignKey: "category_id",
});

Book.belongsTo(Category, {
  foreignKey: "category_id",
});

// Book N:M Author
Book.belongsToMany(Author, {
  through: BookAuthor,
  foreignKey: "book_id",
  otherKey: "author_id",
});

Author.belongsToMany(Book, {
  through: BookAuthor,
  foreignKey: "author_id",
  otherKey: "book_id",
});

module.exports = {
  Book,
  Author,
  Category,
  User,
  BookAuthor,
};