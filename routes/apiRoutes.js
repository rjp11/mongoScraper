var router = require("express").Router();
var articleController = require("../controllers/articleController");
var commentController = require("../controllers/commentController");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");
var scrape = require("../logic/scrape");

// localhost/api/articles
router.post("/scrape", scrape);
router.get("/", articleController.findAll);
router.get("/:id", articleController.find);
router.post("/:id", commentController.create);
router.delete("/:id", commentController.delete);



module.exports = router;