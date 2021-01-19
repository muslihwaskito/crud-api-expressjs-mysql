const mysql = require('mysql');
require("dotenv").config();

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "api-crud-expressjs",
    port: process.env.DB_PORT || 3306,
});

dbConn.connect(function(err) {
    if (err) throw err;

    console.log("Database Connected");
});

module.exports = dbConn;