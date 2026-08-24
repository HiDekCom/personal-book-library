const categoryRepository = require("../repositories/category.repository");

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  async createCategory(categoryData) {
    const name = categoryData.name?.trim();

    if (!name) {
      const error = new Error(
        "Category name is required"
      );

      error.statusCode = 400;

      throw error;
    }

    const existingCategory =
      await categoryRepository.findByName(name);

    if (existingCategory) {
      const error = new Error(
        "Category already exists"
      );

      error.statusCode = 409;

      throw error;
    }

    return await categoryRepository.create({
      name,
    });
  }
}

module.exports = new CategoryService();