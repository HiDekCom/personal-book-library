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

  async findById(id) {
    return await Author.findByPk(id);
  }

  async findByName(name) {
    return await Author.findOne({
      where: {
        name,
      },
    });
  }

  async create(authorData) {
    return await Author.create(authorData);
  }

  async update(id, authorData) {
    const author = await Author.findByPk(id);

    if (!author) {
      return null;
    }

    await author.update(authorData);

    return author;
  }

  async delete(id) {
    const author = await Author.findByPk(id);

    if (!author) {
      return null;
    }

    await author.destroy();

    return author;
  }
}

module.exports = new AuthorRepository();