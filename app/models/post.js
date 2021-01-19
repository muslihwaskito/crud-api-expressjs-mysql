const sql = require("../utils/db.config");
const helper = require("../utils/helper");

module.exports = {
    create:function (data, result) {
        // add created_at
        data.created_at = helper.currentDateTime();

        sql.query("INSERT INTO posts SET ?", data, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created data post: ", { id: res.insertId, ...data });
            result(null, { id: res.insertId, ...data});
        });
    },
    getAll: function (result) {
        sql.query("SELECT posts.*, categories.title, users.firstName, users.lastName, users.email FROM posts LEFT JOIN users ON users.id = posts.author LEFT JOIN categories ON categories.id = posts.categories", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            var prepareData = res.map(function (val, key) {
                return {
                    id: val.id,
                    content: val.content,
                    pub_date: val.pubDate,
                    created_at: val.created_at,
                    updated_at: val.updated_at,
                    category: {
                        id: val.categories,
                        name: val.title
                    },
                    user: {
                        id: val.author,
                        first_name: val.firstName,
                        last_name: val.lastName,
                        email: val.email
                    }
                };
            });

            console.log("Data posts: ", prepareData);
            result(null, prepareData);
        });
    },
    findById: function (id, result) {
        sql.query("SELECT posts.*, categories.title, users.firstName, users.lastName, users.email FROM posts LEFT JOIN users ON users.id = posts.author LEFT JOIN categories ON categories.id = posts.categories WHERE posts.id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                return;
            }

            if (res.length) {
                var prepareData = {
                    id: res[0].id,
                    content: res[0].content,
                    pub_date: res[0].pubDate,
                    created_at: res[0].created_at,
                    updated_at: res[0].updated_at,
                    category: {
                        id: res[0].categories,
                        name: res[0].title,
                    },
                    user: {
                        id: res[0].author,
                        first_name: res[0].firstName,
                        last_name: res[0].lastName,
                        email: res[0].email,
                    },
                };

                console.log("Data post: ", prepareData);
                result(null, prepareData);
                return;
            }

            result({ kind: "not_found" }, null);
        });
    },
    update: function (id, data, result) {
        // add updated_at
        data.updated_at = helper.currentDateTime();

        sql.query("UPDATE posts SET ? WHERE id = ?", [data, id], (err,res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found"}, null);
                return;
            }

            this.findById(id, (err, res) => {
                console.log("Update data post: ", res);
                result(null, res);
            });
        });
    },
    delete: function (id, result) {
        sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("Delete post success with id: ", id);
            result(null, res);
        });
    }
}