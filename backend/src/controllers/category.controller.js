const categoryService = require("../services/category.service");

class CategoryController {
  async getAllCategories(req, res, next) {
    try {
      const categories =
        await categoryService.getAllCategories();

      return res.status(200).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const category =
        await categoryService.createCategory(
          req.body
        );

      return res.status(201).json({
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();