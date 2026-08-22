const authorService = require("../services/author.service");

class AuthorController {
  async getAllAuthors(req, res, next) {
    try {
      const authors = await authorService.getAllAuthors();

      return res.status(200).json({
        data: authors,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthorController();