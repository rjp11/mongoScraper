var router = require("express").Router();
var articleRouter = require("./apiRoutes");
var htmlRouter = require("./htmlRoutes");

router.use("/api/articles", articleRouter);
router.use("/", htmlRouter);

module.exports = router;