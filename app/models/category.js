const sql = require("../utils/db.config");
const helper = require("../utils/helper");

module.exports = {
    create: function (data, result) {
        // add created_at
        data.created_at = helper.currentDateTime();

        sql.query("INSERT INTO categories SET ?", data, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("created category: ", {id: res.insertId, ...data});
            result(null, {id: res.insertId, ...data});
        });
    },
    getAll: function (result) {
        sql.query("SELECT * FROM categories", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Categories: ", res);
            result(null, res);
        });
    },
    findById: function (id, result) {
        sql.query("SELECT * FROM categories where id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: "notfound" }, null);
        });
    },
    update: function (id, data, result) {
        // add updated_at
        data.updated_at = helper.currentDateTime();

        sql.query("UPDATE categories SET ? WHERE id = ?", [data, id], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                resutl(err, null);
                return;
            }

            if (res.affectedRows = 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            this.findById(id, (err, res) => {
                console.log("Update data categories: ", res);
                result(null, res);
            });
        })
    },
    delete: function (id, result) {
        sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Delete categories success with id: ", id);

            result(null, res);
        });
    }
}