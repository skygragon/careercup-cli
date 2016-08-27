var _ = require('underscore');

var client = require('./careercup_client'),
    h = require('./helper');

var core = {};

core.updateQuestions = function(cb) {
  client.updateQuestions(cb);
};

core.countQuestions = function(cb) {
  h.countDB('questions', cb);
};

module.exports = core;
