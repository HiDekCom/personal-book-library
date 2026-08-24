const authorService = require("../services/author.service");

class AuthorController {
  async getAllAuthors(req, res, next) {
    try {
      const authors =
        await authorService.getAllAuthors();

      return res.status(200).json({
        data: authors,
      });
    } catch (error) {
      next(error);
    }
  }

  async createAuthor(req, res, next) {
    try {
      const author =
        await authorService.createAuthor(
          req.body
        );

      return res.status(201).json({
        message: "Author created successfully",
        data: author,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthorController();