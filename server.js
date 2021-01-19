const express = require('express');
const app = express();
const index = require('./app/route');
const users = require('./app/route/users');
const category = require("./app/route/category");
const post = require("./app/route/post");
const middlewareAuth = require('./app/utils/middleware-auth');

// declare dotenv module
require('dotenv').config();

const bodyParser = require('body-parser');
const config = require('./app/utils/config');
const db = require('./app/utils/db.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/', index);
app.use('/users', middlewareAuth, users)
app.use("/category", middlewareAuth, category);
app.use("/post", middlewareAuth, post);

// exception handle error route not found
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// handle error message
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(config.port, () => {
    console.log('The app is running on port ' + config.port);
})