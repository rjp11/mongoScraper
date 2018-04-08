var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

var scrape = function(req, res) {
    request("https://www.theringer.com/", function (error, response, html) {
        var $ = cheerio.load(html);

        if (error) {
            console.log(error);
            throw error;
        }

        var result = {};

        // selecting the headlines from The Ringer
        $("h2.c-entry-box--compact__title").each(function (i, element) {

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
}


module.exports = scrape;