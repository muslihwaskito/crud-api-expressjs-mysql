const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        var prepareRequest = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        userModel.create(prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "User added successfully!!!",
                    data: result
                })    
            }
        })
    },
    login: function (req, res, next) {
        userModel.findByEmail(req.body.email, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    delete result.password;
                    var token = jwt.sign({result}, process.env.APP_KEY, {expiresIn: '7 days'});

                    res.json({
                        status: "success",
                        message: "user found!!!",
                        token: token,
                        data: result
                    })
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!",
                        data: null
                    })
                }
            }
        })
    },
    list: function (req, res, next) {
        userModel.getAll(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data success",
                    data: result
                })
            }
        })
    },
    detail: function (req, res, next) {
        userModel.findById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Get data success",
                    data: result
                })
            }
        })
    },
    update: function (req, res, next) {
        var prepareRequest = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
        };

        userModel.update(req.params.id, prepareRequest, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Update data success",
                    data: result
                });
            }
        })
    },
    delete: function (req, res, next) {
        userModel.delete(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: `Delete data with id = ${req.params.id} success!!!`,
                    data: null
                })
            }
        })
    }
}