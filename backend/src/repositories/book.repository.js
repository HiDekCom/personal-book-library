const { Book, Author, Category } = require("../models");

class BookRepository {
  async findAll(filters = {}) {
    const where = {};

    if (filters.categoryId) {
      where.category_id = filters.categoryId;
    }

    const include = [
      {
        model: Category,
        attributes: ["id", "name"],
      },
      {
        model: Author,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ];

    if (filters.authorId) {
      include[1].where = {
        id: filters.authorId,
      };
    }

    return await Book.findAll({
      where,
      include,
      order: [["created_at", "DESC"]],
    });
  }

  async findById(id) {
    return await Book.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Author,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async create(bookData, authorIds) {
    const book = await Book.create(bookData);

    if (authorIds && authorIds.length > 0) {
      await book.setAuthors(authorIds);
    }

    return await this.findById(book.id);
  }

  async delete(id) {
    const book = await Book.findByPk(id);

    if (!book) {
      return null;
    }

    await book.destroy();

    return book;
  }
}

module.exports = new BookRepository();