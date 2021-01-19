'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable(
    "posts",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      content: "string",
      pubDate: {type: "string", length: 15},
      author: { type: "int", length: 11 },
      categories: { type: "int", length: 11},
      created_at: { type: "timestamp", notnull: false},
      updated_at: { type: "timestamp", notnull: false},
    },
    callback
  )
};

exports.down = function(db, callback) {
 db.dropTable("posts", callback);
};

exports._meta = {
  "version": 1
};
