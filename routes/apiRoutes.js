var router = require("express").Router();
var articleController = require("../controllers/articleController");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");
var scrape = require("../logic/scrape");

// localhost/api/articles
router.get("/", articleController.findAll);
router.get("/:id", articleController.find);
router.post("/", articleController.create);
router.post("/scrape", scrape);


module.exports = router;