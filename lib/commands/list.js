var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;

var core = require('../core');

var cmd = {
  command: 'list [keyword]',
  desc:    'list questions',
  builder: {
    company: {
      alias:    'c',
      type:     'string',
      default:  '',
      describe: 'Filter by company'
    },
    tag: {
      alias:    't',
      type:     'string',
      default:  '',
      describe: 'Filter by tag'
    },
    label: {
      alias:    'l',
      type:     'string',
      default:  '',
      describe: 'Filter by label'
    }
  }
};

function summary(q) {
  var n = 80 - q.company.length - q.id.length - 4;
  var s = q.data.replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
  return s.length > n ? s.substr(0, n - 4) + ' ...' : s;
}

cmd.handler = function(argv) {
  var cond = {};

  if (argv.company.length > 0) {
    cond.company = new RegExp(argv.company, 'i');
  }

  if (argv.tag.length > 0) {
    cond.tags = new RegExp(argv.tag, 'i');
  }

  if (argv.label.length > 0) {
    cond.labels = new RegExp(argv.label, 'i');
  }

  if (argv.keyword && argv.keyword.length > 0) {
    cond.data = new RegExp(argv.keyword, 'i');
  }

  core.getQuestions(cond, function(e, questions) {
    if (e) return console.log('ERROR:', e);

    questions.forEach(function(question) {
      console.log(sprintf('%s %s - %s',
            chalk.yellow(question.company),
            chalk.dim.underline(question.id),
            summary(question)));
    });

    console.log();
    console.log('Questions:', questions.length);
  });
};

module.exports = cmd;
