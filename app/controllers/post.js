const postModel = require("../models/post");

module.exports = {
    create: function (req, res, next) {
        var prepareRequest = {
            content: req.body.content,
            author: req.auth.id,
            categories: req.body.categories,
            pubDate: req.body.pub_date,
        };

        postModel.create(prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Create data post successfully!!!",
                    data: result
                })
            }
        })
    },
    list: function (req, res, next) {
        postModel.getAll(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data post successfully!!!",
                    data: result
                });
            }
        });
    },
    detail: function (req, res, next) {
        postModel.findById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data post successfully!!!",
                    data: result
                });
            }
        });
    },
    update: function (req, res, next) {
        var prepareRequest = {
            content: req.body.content,
            author: req.auth.author,
            categories: req.body.categories,
            pubDate: req.body.pub_date,
        };

        postModel.update(req.params.id, prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Update data post successfully!!!",
                    data: result
                });
            }
        });
    },
    delete: function (req, res, next) {
        postModel.delete(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: `Delete data post id: ${req.params.id} successfully!!!`,
                    data: null
                })
            }
        })
    }
}