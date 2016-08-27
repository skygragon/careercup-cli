var client = require('./careercup_client');
var h = require('./helper');

var core = {};

core.updateQuestions = function(cb) {
  client.updateQuestions(cb);
};

core.countQuestions = function(cb) {
  h.countDB('questions', cb);
};

core.getQuestions = function(cond, cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    db.find(cond, cb);
  });
};

core.getQuestion = function(id, cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    db.findOne({id: String(id)}, cb);
  });
};

core.getRandomQuestion = function(cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    var r = Math.random();
    db.findOne({rand: {$gt: r}}, function(e, question) {
      if (question) return cb(e, question);

      db.findOne({rand: {$lt: r}}, cb);
    });
  });
};

module.exports = core;
