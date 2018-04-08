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

    },

    create: (req, res) => {

        db.Comment.create(req.body)
            .then(function (dbComment) {

                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    comment: dbComment._id
                }, {
                    new: true
                });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    }
}