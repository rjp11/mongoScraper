var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "mongoScraper";
var collections = ["ringerData"];

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var PORT = process.env.PORT || 3000;

// Listen on port 3000
app.listen(3000, function () {
    console.log("Listening on port %s", PORT);
});