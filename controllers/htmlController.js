var db = require("../models");

module.exports = {
    find: function (req, res) {
        db.Article.find({}).then(function (dbArticles) {
            res.render("home", {
                articles: dbArticles
            });
        });
    }
}