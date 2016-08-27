var _ = require('underscore');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;

var core = require('../core');

var cmd = {
  command: 'stat',
  desc:    'show question statistics',
  builder: {
    company: {
      alias:    'c',
      type:     'boolean',
      describe: 'Count by company'
    },
    tag: {
      alias:    't',
      type:     'boolean',
      describe: 'Count by tag'
    },
    num: {
      alias:    'n',
      type:     'number',
      default:  10,
      describe: 'Only show the first n results (0 means all)'
    }
  }
};

cmd.handler = function(argv) {
  core.getQuestions({}, function(e, questions) {
    if (e) return console.log('ERROR:', e);

    console.log('Questions:', questions.length);

    var stat = {};
    if (argv.company) {
      console.log('By: company');
      questions.forEach(function(q) {
        var k = q.company || 'N/A';
        stat[k] = (stat[k] || 0) + 1;
      });
    } else if (argv.tag) {
      console.log('By: tags');
      questions.forEach(function(q) {
        q.tags.forEach(function(tag) {
          stat[tag] = (stat[tag] || 0) + 1;
        });
      });
    }

    var results = _.sortBy(_.pairs(stat), function(pair) {
      return -pair[1];
    });

    if (argv.num > 0) {
      results = _.first(results, argv.num);
    }

    console.log();
    results.forEach(function(pair, i) {
      console.log(
          sprintf('[%-2d]', i + 1),
          sprintf(' %6s ', pair[1]),
          chalk.yellow(pair[0]));
    });
  });
};

module.exports = cmd;
