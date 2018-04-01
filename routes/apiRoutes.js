var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var databaseUrl = "mongoScraper";
var collections = ["ringerData"];

// CHANGE TO REQUIRE ( MODELS )
// var db = mongojs(databaseUrl, collections);
var db = require("../models")

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        request("https://www.theringer.com/", function (error, response, html) {
            var $ = cheerio.load(html);

            if (error) {
                console.log(error);
                throw error;
            }

            var result = {};

            $("h2.c-entry-box--compact__title").each(function (i, element) {
                // var title = $(element).text();
                // var link = $(element).children().attr("href");
                // var summary = $(element).next('.p-dek').text();

                result.title = $(this).text();
                result.link = $(this).children().attr("href");
                result.summary = $(this).next('.p-dek').text();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });

            });

           res.send("Scrape Complete")
        });
    });

};