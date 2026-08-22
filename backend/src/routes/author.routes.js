const express = require("express");

const authorController = require("../controllers/author.controller");

const router = express.Router();

router.get("/", authorController.getAllAuthors);

module.exports = router;