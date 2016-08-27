var _ = require('underscore');
var chalk = require('chalk');

var core = require('../core');

var cmd = {
  command: 'show [id]',
  desc:    'show question by id',
  builder: {
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
  console.log();
  console.log(question.data);
  console.log();
}

cmd.handler = function(argv) {
  if (!argv.id) {
    core.getRandomQuestion(function(e, question) {
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
