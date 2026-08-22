const authorRepository = require("../repositories/author.repository");

class AuthorService {
  async getAllAuthors() {
    return await authorRepository.findAll();
  }

  async validateAuthors(authorIds) {
    const authors = await authorRepository.findByIds(authorIds);

    if (authors.length !== authorIds.length) {
      throw new Error("One or more authors do not exist");
    }

    return authors;
  }
}

module.exports = new AuthorService();