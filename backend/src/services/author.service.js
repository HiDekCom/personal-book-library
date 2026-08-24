const authorRepository = require("../repositories/author.repository");

class AuthorService {
  async getAllAuthors() {
    return await authorRepository.findAll();
  }

  async validateAuthors(authorIds) {
    const authors = await authorRepository.findByIds(authorIds);

    if (authors.length !== authorIds.length) {
      const error = new Error(
        "One or more authors do not exist"
      );

      error.statusCode = 400;

      throw error;
    }

    return authors;
  }

  async createAuthor(authorData) {
    const { name } = authorData;

    // ตรวจสอบชื่อว่าง
    if (!name || !name.trim()) {
      const error = new Error(
        "Author name is required"
      );

      error.statusCode = 400;

      throw error;
    }

    const authorName = name.trim();

    // ตรวจสอบชื่อซ้ำ
    const existingAuthor =
      await authorRepository.findByName(
        authorName
      );

    if (existingAuthor) {
      const error = new Error(
        "Author already exists"
      );

      error.statusCode = 409;

      throw error;
    }

    return await authorRepository.create({
      name: authorName,
    });
  }
}

module.exports = new AuthorService();