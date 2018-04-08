var router = require("express").Router();
var htmlController = require("../controllers/htmlController");

router.get("/", htmlController.find);

module.exports = router;