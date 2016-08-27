var _ = require('underscore');
var chalk = require('chalk');

var core = require('../core');

var cmd = {
  command: 'update',
  desc:    'update question list',
  builder: {
    full: {
      alias:    'f',
      type:     'boolean',
      default:  'false',
      describe: 'Force a full update'
    }
  }
};

cmd.handler = function(argv) {
  var cond = {full: argv.full};

  core.updateQuestions(cond, function(e, result) {
    if (e) return console.log('ERROR:', e);

    var lastPage = _.min(result.workers) - 1;
    console.log();
    console.log('Last new page:', lastPage);
    console.log('New questions:', chalk.green(result.count));

    core.countQuestions(function(e, n) {
      console.log('All questions:', chalk.yellow(n));
    });
  });
};

module.exports = cmd;
