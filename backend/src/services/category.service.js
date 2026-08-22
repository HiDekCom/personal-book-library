const categoryRepository = require("../repositories/category.repository");

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }
}

module.exports = new CategoryService();