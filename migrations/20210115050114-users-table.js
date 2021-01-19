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
      "users",
      {
          id: { type: "int", primaryKey: true, autoIncrement: true },
          firstName: {type: "string", length: 30},
          lastName: {type: "string", length: 30},
          email: {type: "string", notNUll: true},
          password: {type: "string", notNUll: true},
          created_at: { type: "timestamp", notnull: false},
          updated_at: { type: "timestamp", notnull: false},

      },
      callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("users", callback);
};

exports._meta = {
  "version": 1
};
