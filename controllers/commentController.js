var db = require("../models")

module.exports = {

    create: (req, res) => {

        db.Comment.create(req.body)
            .then(function (dbComment) {

                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $push: {
                        comment: dbComment._id
                    }
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
    },

    delete: (req, res) => {

        db.Comment.findByIdAndRemove(req.params.id)
        .then(dbComment => res.json(dbComment))
        .catch(dbComment => res.json(err))
    }
}