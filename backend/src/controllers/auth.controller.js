const authService = require("../services/auth.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await authService.login(
        username,
        password
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();