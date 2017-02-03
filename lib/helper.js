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
};

var dbcache = {};

h.getDB = function(dbname, cb) {
  // use cached db if possible
  if (dbcache[dbname])
    return cb(null, dbcache[dbname]);

  // ask daemon to access DB for us
  if (require('./config').USE_DAEMON) {
    var db = require('./daemon_client');
    dbcache[dbname] = db;
    return cb(null, db);
  }

  // access local DB directly
  var NeDB = require('nedb');
  var db = new NeDB({filename: this.getDBFile(dbname), autoload: true});
  db.ensureIndex({fieldName: 'id', unique: true}, function(e) {
    db.ensureIndex({fieldName: 'rand', unique: false}, function(e) {
      dbcache[dbname] = db;
      cb(e, db);
    });
  });
};

h.countDB = function(dbname, cb) {
  h.getDB(dbname, function(e, db) {
    if (e) return cb(e);
    db.count({}, cb);
  });
};

module.exports = h;
