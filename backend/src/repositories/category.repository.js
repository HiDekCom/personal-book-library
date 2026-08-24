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

  async findByName(name) {
    return await Category.findOne({
      where: {
        name,
      },
    });
  }

  async create(categoryData) {
    return await Category.create(categoryData);
  }
}

module.exports = new CategoryRepository();