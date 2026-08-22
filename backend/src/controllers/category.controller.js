const categoryService = require("../services/category.service");

class CategoryController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();

      return res.status(200).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();