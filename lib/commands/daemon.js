var cp = require('child_process');
var path = require('path');

var client = require('../daemon_client');

var cmd = {
  command: 'daemon [action]',
  desc:    'start|stop backend daemon',
  builder: {
  }
};

cmd.handler = function(argv) {
  if (argv.action === 'start') {
    var child = cp.spawn(
        'node',
        [path.join(__dirname, '..', 'daemon.js')],
        {detached: true, stdio: 'ignore'}
    );
    child.on('error', function(e) {
      console.log('ERROR:', e);
    });
    child.unref();
    return;
  }

  if (argv.action === 'stop') {
    client.sendToDaemon('stop', [], function(e, msg) {
      console.log(msg);
    });
    return;
  }
};

module.exports = cmd;
