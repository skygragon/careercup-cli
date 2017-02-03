var _ = require('underscore');
var chalk = require('chalk');

var core = require('../core');

var cmd = {
  command: 'show [id]',
  desc:    'show question by id',
  builder: {
    company: {
      alias:    'c',
      type:     'string',
      default:  '',
      describe: 'By company in random mode.'
    },
    tag: {
      alias:    't',
      type:     'string',
      default:  '',
      describe: 'By tag in random mode.'
    }
  }
};

function showQuestion(question) {
  console.log('ID:', question.id);
  console.log();
  console.log(chalk.underline(question.link));
  console.log();

  if (question.company.length > 0) {
    console.log('*', chalk.yellow(question.company));
  }

  console.log('*', question.time);

  if (question.tags.length > 0) {
    var tags = _.map(question.tags, function(tag) {
      return chalk.green.underline(tag);
    });
    console.log('*', tags.join(' '));
  }

  if (question.labels && question.labels.length > 0) {
    var labels = _.map(question.labels, function(label) {
      return chalk.cyan.underline(label);
    });
    console.log('*', labels.join(' '));
  }

  console.log();
  console.log(question.data.replace(/\r/g, '\n'));
  console.log();
}

cmd.handler = function(argv) {
  if (!argv.id) {
    var cond = {$not: {labels: 'done'}};

    if (argv.company.length > 0) {
      cond.company = {$regex: new RegExp(argv.company, 'i')};
    }

    if (argv.tag.length > 0) {
      cond.tags = {$regex: new RegExp(argv.tag, 'i')};
    }

    core.getRandomQuestion(cond, function(e, question) {
      if (e) return console.log('ERROR:', e);

      showQuestion(question);
    });
    return;
  }

  core.getQuestion(argv.id, function(e, question) {
    if (e) return console.log('ERROR:', e);

    showQuestion(question);
  });
};

module.exports = cmd;
