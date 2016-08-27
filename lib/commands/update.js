var _ = require('underscore');
var sprintf = require('sprintf-js').sprintf;

var core = require('../core');

var cmd = {
  command: 'update',
  desc:    'update question list',
  builder: {
  }
};

cmd.handler = function(argv) {
  core.updateQuestions(function(e, result) {
    if (e) return console.log('ERROR:', e);

    var lastPage = _.min(result.workers) - 1;
    console.log();
    console.log('Updated pages:', lastPage);
    console.log('New questions:', result.count);

    core.countQuestions(function(e, n) {
      console.log('All questions:', n);
    });
  });
};

module.exports = cmd;
