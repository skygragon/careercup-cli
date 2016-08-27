var core = require('../core');

var cmd = {
  command: 'mark <id> [label]',
  desc:    'mark question with customized lavel (default: done)',
  builder: {
    delete: {
      alias:    'd',
      type:     'boolean',
      default:  false,
      describe: 'Delete lavel'
    }
  }
};

cmd.handler = function(argv) {
  var toAdd = [];
  var toDelete = [];

  var label = argv.label || 'done';

  if (argv.delete) {
    toDelete.push(label);
  } else {
    toAdd.push(label);
  }

  core.markQuestion(argv.id, toAdd, toDelete, function(e, n) {
    if (e) return console.log('ERROR:', e);

    if (n === 1) console.log('OK');
  });
};

module.exports = cmd;
