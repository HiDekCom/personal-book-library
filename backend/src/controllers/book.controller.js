const bookService = require("../services/book.service");

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const { categoryId, authorId } = req.query;

      const filters = {
        categoryId,
        authorId,
      };

      const books =
        await bookService.getAllBooks(filters);

      return res.status(200).json({
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const { id } = req.params;

      const book =
        await bookService.getBookById(id);

      return res.status(200).json({
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const book =
        await bookService.createBook(req.body);

      return res.status(201).json({
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // UPDATE BOOK
  // =========================
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const book =
        await bookService.updateBook(
          id,
          req.body
        );

      return res.status(200).json({
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;

      await bookService.deleteBook(id);

      return res.status(200).json({
        message: "Book deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();