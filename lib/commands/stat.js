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

function hasLabel(q, label) {
  return q.labels && q.labels.indexOf(label) >= 0;
}

cmd.handler = function(argv) {
  core.getQuestions({}, function(e, questions) {
    if (e) return console.log('ERROR:', e);

    var stat = {};
    var statDone = {};
    var keyword = '';

    if (argv.company) {
      keyword = 'Company';
      questions.forEach(function(q) {
        var k = q.company || 'N/A';
        stat[k] = (stat[k] || 0) + 1;

        if (hasLabel(q, 'done')) {
          statDone[k] = (statDone[k] || 0) + 1;
        }
      });
    } else if (argv.tag) {
      keyword = 'Tags';
      questions.forEach(function(q) {
        q.tags.forEach(function(tag) {
          stat[tag] = (stat[tag] || 0) + 1;

          if (hasLabel(q, 'done')) {
            statDone[tag] = (statDone[tag] || 0) + 1;
          }
        });
      });
    }

    var results = _.sortBy(_.pairs(stat), function(p) {
      return -p[1];
    });

    if (argv.num > 0) {
      results = _.first(results, argv.num);
    }

    console.log();
    var all = questions.length;
    var done = _.reduce(questions, function(s, q) {
      return s + (hasLabel(q, 'done') ? 1 : 0);
    }, 0);

    console.log(sprintf('[**] %5s/%-5s (%.2f%%)  %s',
          done, all, done * 100 / all,
          chalk.yellow(keyword)));

    if (results.length > 0) {
      var len = _.max(results, function(p) {
        return p[0].length;
      })[0].length + 27;
      console.log(new Buffer(len).fill('-').toString());
    }

    results.forEach(function(p, i) {
      var subDone = statDone[p[0]] || 0;

      console.log(
          sprintf('[%-2d]', i + 1),
          sprintf('%5s/%-5s', subDone, p[1]),
          sprintf('(%.2f%%) ', subDone * 100 / p[1]),
          chalk.yellow(p[0]));
    });
  });
};

module.exports = cmd;
