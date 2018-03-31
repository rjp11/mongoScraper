var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var databaseUrl = "mongoScraper";
var collections = ["ringerData"];

var db = mongojs(databaseUrl, collections);

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        request("https://www.theringer.com/", function (error, response, html) {
            var $ = cheerio.load(html);

            if (error) {
                console.log(error);
                throw error;
            }

            var results = [];

            $("h2.c-entry-box--compact__title").each(function (i, element) {
                var title = $(element).text();
                var link = $(element).children().attr("href");
                var summary = $(element).next('.p-dek').text();

                results.push({
                    title,
                    link,
                    summary
                });

            });

            db.scrapedData.insert(results);
            res.json(results);
        });
    });

};