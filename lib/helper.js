var h = {};

h.getHomeDir = function() {
  return process.env.HOME || process.env.USERPROFILE;
};

h.getCacheDir = function() {
  return this.getHomeDir() + '/.c3/';
};

h.getConfigFile = function() {
  return this.getHomeDir() + '/.c3config';
};

h.getDBFile = function(dbname) {
  return this.getCacheDir() + dbname + '.nedb';
};

h.prettyNumber = function(n) {
  return n === null ? '✘' : n;
}

h.getDB = function(dbname, cb) {
  var NeDB = require('nedb');
  db = new NeDB({filename: this.getDBFile(dbname), autoload: true});
  db.ensureIndex({fieldName: 'id', unique: true}, function(e) {
    cb(e, db);
  });
};

h.countDB = function(dbname, cb) {
  h.getDB(dbname, function(e, db) {
    if (e) return cb(e);
    db.count({}, cb);
  });
};

module.exports = h;
