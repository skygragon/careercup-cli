var sprintf = require('sprintf-js').sprintf;

var cmd = {
  command: 'version',
  desc:    'show version info',
  builder: {
    verbose: {
      alias:    'v',
      type:     'boolean',
      describe: 'More verbose info'
    }
  }
};

cmd.handler = function(argv) {
  var version = require('../../package.json').version;

  if (!argv.verbose) {
    return console.log(version);
  }

  var logo = [
    '  ___   __ _  _ __   ___   ___  _ __   ___  _   _  _ __ ',
    ' / __| / _` || \'__| / _ \\ / _ \\| \'__| / __|| | | || \'_ \\ ',
    '| (__ | (_| || |   |  __/|  __/| |   | (__ | |_| || |_) |',
    ' \\___| \\__,_||_|    \\___| \\___||_|    \\___| \\__,_|| .__/ ',
    '                                                  | |',
    '  CLI  v' + version + '                                     |_|'
  ].join('\n');

  console.log(logo);
  console.log();

  var h = require('../helper');
  console.log();
  console.log('[Environment]');
  console.log('Cache:   ', h.getCacheDir());
  console.log('Config:  ', h.getConfigFile());
  console.log('Database:', h.getDBFile('questions'));
  console.log();

  var config = require('../config');
  console.log('[Configuration]');
  Object.getOwnPropertyNames(config).forEach(function(k) {
    console.log(sprintf('%-20s%s', k + ':', config[k]));
  });
};

module.exports = cmd;
