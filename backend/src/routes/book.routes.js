const express = require("express");

const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

router.post(
  "/",
  authMiddleware,
  bookController.createBook
);

router.delete(
  "/:id",
  authMiddleware,
  bookController.deleteBook
);

module.exports = router;