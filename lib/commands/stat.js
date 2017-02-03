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
      default:  false,
      describe: 'Count by company'
    },
    tag: {
      alias:    't',
      type:     'boolean',
      default:  false,
      describe: 'Count by tag'
    },
    label: {
      alias:    'l',
      type:     'boolean',
      default:  false,
      describe: 'Count by label'
    },
    num: {
      alias:    'n',
      type:     'number',
      default:  10,
      describe: 'Only show the first n results (0 means all)'
    }
  }
};

function countDone(q) {
  return (q.labels && q.labels.indexOf('done') >= 0) ? 1 : 0;
}

function add(map, k, v) {
  k = k || 'N/A';
  map[k] = (map[k] || 0) + v;
}

cmd.handler = function(argv) {
  core.getQuestions({}, function(e, questions) {
    if (e) return console.log('ERROR:', e);

    var stat = {};
    var statDone = {};
    var keyword = '';
    var colorit = chalk.white;

    if (argv.company) {
      keyword = 'Company';
      colorit = chalk.yellow;

      questions.forEach(function(q) {
        add(stat, q.company, 1);
        add(statDone, q.company, countDone(q));
      });
    } else if (argv.tag) {
      keyword = 'Tags';
      colorit = chalk.green;

      questions.forEach(function(q) {
        q.tags.forEach(function(tag) {
          add(stat, tag, 1);
          add(statDone, tag, countDone(q));
        });
      });
    } else if (argv.label) {
      keyword = 'Labels';
      colorit = chalk.cyan;

      questions.forEach(function(q) {
        (q.labels || []).forEach(function(label) {
          add(stat, label, 1);
          add(statDone, label, countDone(q));
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
    var done = _.reduce(questions, function(sum, q) {
      return sum + countDone(q);
    }, 0);

    console.log(sprintf('     %5s/%-5s %6.2f%%  %s',
          done, all, done * 100 / all,
          colorit(keyword)));

    if (results.length > 0) {
      var len = _.max(results, function(p) {
        return p[0].length;
      })[0].length + 27;
      console.log('-'.repeat(len));
    }

    results.forEach(function(p, i) {
      console.log(
          sprintf('%3d.', i + 1),
          sprintf('%5s/%-5s', statDone[p[0]], p[1]),
          sprintf('%6.2f%% ', statDone[p[0]] * 100 / p[1]),
          colorit(p[0]));
    });
  });
};

module.exports = cmd;
