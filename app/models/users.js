const sql = require("../utils/db.config.js");
const helper = require("../utils/helper.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    create: function (data, result) {
        // hash password
        data.password = bcrypt.hashSync(data.password, saltRounds);

        // add created_at
        data.created_at = helper.currentDateTime();

        sql.query("INSERT INTO users SET ?", data, (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            // remove return password
            delete data.password;

            console.log("created users: ", { id: res.insertId, ...data });
            result(null, { id: res.insertId, ...data });
        });
    },
    findByEmail: function (email, result) {
        sql.query(`SELECT * FROM users WHERE email like "%${email}%"`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("Found users: ", res[0]);
                result(null, res[0]);
                return;
            }

            //  not found data
            result({ kind: "Not Found Users"}, null);
        });
    },
    getAll: function (result) {
        sql.query("SELECT * FROM users", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }            

            // prepare data
            const prepareData = res.map(function(val,key){
                delete val.password;
                return val;
            });

            console.log("Users: ", prepareData);
            result(null, prepareData);
        });
    },
    findById: function (id, result) {
        sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                delete res[0].password;
                result(null, res[0]);
                return;
            }

            result({kind: "not_found"}, null);
        });
    },
    update: function (id, data, result) {
        // add updated_by
        data.updated_at = helper.currentDateTime();
        
        sql.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows = 0) {
                result({ kind: "not_found"}, null);
                return;
            }

            this.findById(id, (err, res) => {
                console.log("update data user: ", res);
                result(null, res);
            });            
        });
    },
    delete: function (id, result) {
        sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("delete users success with id: ", id);

            result(null, res);
        });
    }
};