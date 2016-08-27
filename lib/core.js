var _ = require('underscore');

var client = require('./careercup_client');
var h = require('./helper');

var core = {};

core.updateQuestions = function(cond, cb) {
  client.updateQuestions(cond, cb);
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

core.getRandomQuestion = function(cond, cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    var r = Math.random();
    cond.rand = {$gt: r};
    db.findOne(cond, function(e, question) {
      if (question) return cb(e, question);

      db.findOne({rand: {$lt: r}}, cb);
    });
  });
};

core.markQuestion = function(id, toAdd, toDelete, cb) {
  var self = this;

  this.getQuestion(id, function(e, question) {
    if (e) return cb(e);

    var labels = question.labels || [];
    question.labels = _.difference(_.union(labels, toAdd), toDelete);

    self.updateQuestion(question, cb);
  });
};

core.updateQuestion = function(question, cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    db.update({id: question.id}, question, cb);
  });
};

module.exports = core;
