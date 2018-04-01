var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoScraper");


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var PORT = process.env.PORT || 3000;

// Listen on port 3000
app.listen(3000, function () {
    console.log("Listening on port %s", PORT);
});