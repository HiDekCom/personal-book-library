const { Author } = require("../models");

class AuthorRepository {
  async findAll() {
    return await Author.findAll({
      order: [["name", "ASC"]],
    });
  }

  async findByIds(ids) {
    return await Author.findAll({
      where: {
        id: ids,
      },
    });
  }
}

module.exports = new AuthorRepository();