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

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});

app.get("/scrape", function (req, res) {
  request("https://www.theringer.com/", function (error, response, html) {
    var $ = cheerio.load(html);

    if (error){
        console.log(error);
        throw error;
    }

    var results = [];

    $("h2.c-entry-box--compact__title").each(function (i, element) {
      var title = $(element).text();
      var link = $(element).children().attr("href");
      // var summary = $(element).

      results.push({
        title,
        link
      });

    });

    db.scrapedData.insert(results);
    res.json(results);
  });
});


// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});