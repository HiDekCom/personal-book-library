const bookRepository = require("../repositories/book.repository");
const authorRepository = require("../repositories/author.repository");
const categoryRepository = require("../repositories/category.repository");

class BookService {
  async getAllBooks(filters) {
    return await bookRepository.findAll(filters);
  }

  async getBookById(id) {
    const book = await bookRepository.findById(id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    return book;
  }

  async createBook(bookData) {
    const {
      title,
      isbn,
      description,
      categoryId,
      authorIds,
    } = bookData;

    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    }

    if (!categoryId) {
      const error = new Error("Category is required");
      error.statusCode = 400;
      throw error;
    }

    if (
      !authorIds ||
      !Array.isArray(authorIds) ||
      authorIds.length === 0
    ) {
      const error = new Error(
        "At least one author is required"
      );
      error.statusCode = 400;
      throw error;
    }

    const category =
      await categoryRepository.findById(categoryId);

    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 400;
      throw error;
    }

    const authors =
      await authorRepository.findByIds(authorIds);

    if (authors.length !== authorIds.length) {
      const error = new Error(
        "One or more authors not found"
      );
      error.statusCode = 400;
      throw error;
    }

    const book = await bookRepository.create(
      {
        title,
        isbn,
        description,
        category_id: categoryId,
      },
      authorIds
    );

    return book;
  }

  // =========================
  // UPDATE BOOK
  // =========================
  async updateBook(id, bookData) {
    const {
      title,
      isbn,
      description,
      categoryId,
      authorIds,
    } = bookData;

    // ตรวจสอบว่าหนังสือมีอยู่จริง
    const existingBook =
      await bookRepository.findById(id);

    if (!existingBook) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    // ตรวจสอบ title
    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    }

    // ตรวจสอบ category
    if (!categoryId) {
      const error = new Error(
        "Category is required"
      );
      error.statusCode = 400;
      throw error;
    }

    // ตรวจสอบ author
    if (
      !authorIds ||
      !Array.isArray(authorIds) ||
      authorIds.length === 0
    ) {
      const error = new Error(
        "At least one author is required"
      );
      error.statusCode = 400;
      throw error;
    }

    // ตรวจสอบ category ว่ามีจริง
    const category =
      await categoryRepository.findById(categoryId);

    if (!category) {
      const error = new Error(
        "Category not found"
      );
      error.statusCode = 400;
      throw error;
    }

    // ตรวจสอบ authors ว่ามีจริง
    const authors =
      await authorRepository.findByIds(authorIds);

    if (authors.length !== authorIds.length) {
      const error = new Error(
        "One or more authors not found"
      );
      error.statusCode = 400;
      throw error;
    }

    // Update
    const updatedBook =
      await bookRepository.update(
        id,
        {
          title,
          isbn,
          description,
          category_id: categoryId,
        },
        authorIds
      );

    return updatedBook;
  }

  async deleteBook(id) {
    const book =
      await bookRepository.findById(id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    await bookRepository.delete(id);
  }
}

module.exports = new BookService();