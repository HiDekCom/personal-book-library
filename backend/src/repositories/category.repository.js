const { Category } = require("../models");

class CategoryRepository {
  async findAll() {
    return await Category.findAll({
      order: [["name", "ASC"]],
    });
  }

  async findById(id) {
    return await Category.findByPk(id);
  }
}

module.exports = new CategoryRepository();