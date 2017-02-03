var core = require('../core');

var cmd = {
  command: 'mark <id> [labels..]',
  desc:    'mark question with customized label (default: done)',
  builder: {
  }
};

cmd.handler = function(argv) {
  var toAdd = [];
  var toDelete = [];

  var labels = argv.labels;
  if (labels.length === 0)
    labels.push('done');

  labels.forEach(function(label) {
    switch (label[0]) {
      case '+': toAdd.push(label.substr(1));    break;
      case '~': toDelete.push(label.substr(1)); break;
      default:  toAdd.push(label);              break;
    }
  });

  core.markQuestion(argv.id, toAdd, toDelete, function(e, n) {
    if (e) return console.log('ERROR:', e);

    if (n === 1) console.log('OK');
  });
};

module.exports = cmd;
