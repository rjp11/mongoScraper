var db = require("../models")

module.exports = {

    findAll: (req, res) => {

        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });

    },

    find: (req, res) => {

        db.Article.findOne({
                _id: req.params.id
            })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });

    }
    
}