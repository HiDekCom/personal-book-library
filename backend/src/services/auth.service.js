const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

class AuthService {
  async login(username, password) {
    if (!username || !password) {
      const error = new Error("Username and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      const error = new Error("Invalid username or password");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      const error = new Error("Invalid username or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}

module.exports = new AuthService();