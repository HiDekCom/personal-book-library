const express = require("express");

const authorController = require("../controllers/author.controller");

const router = express.Router();

router.get(
  "/",
  authorController.getAllAuthors
);

router.post(
  "/",
  authorController.createAuthor
);

module.exports = router;