const categoryModel = require('../models/category');

module.exports = {
    create: function (req, res, next) {
        var prepareRequest = {
            title: req.body.title
        }

        categoryModel.create(prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 'success',
                    message: 'Create new category successfully!!!',
                    data: result
                });
            }
        })
    },
    list: function (req, res, next) {
        categoryModel.getAll(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data success",
                    data: result
                });
            }
        })
    },
    detail: function (req, res, next) {
        categoryModel.findById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data success",
                    data: result
                });
            }
        })
    },
    update: function (req, res, next) {
        var prepareRequest = {
            title: req.body.title
        }

        categoryModel.update(req.params.id, prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: `Update data success`,
                    data: result
                });
            }
        })
    },
    delete: function (req, res, next) {
        categoryModel.delete(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: `Delete categories with id = ${req.params.id} success`,
                    data: null
                })
            }
        })
    }
}