var _ = require('underscore');
var fs = require('fs');

var h = require('./helper');

var defaultConfig = {
  // usually you don't wanna change those
  BASE_URL:          'https://careercup.com',
  QUESTIONS_URL:     'https://careercup.com/page?n=%d',
  QUESTIONS_WORKERS: 10,  // don't too much!!
  DAEMON_PORT:       12345,

  // but you will want change these
  USE_COLOR:  true,
  USE_DAEMON: false,
};

function initConfig() {
  var config = defaultConfig;

  // check local config: ~/.c3config
  var f = h.getConfigFile();
  if (fs.existsSync(f)) {
    var localConfig = JSON.parse(fs.readFileSync(f));
    _.extend(defaultConfig, localConfig);
  }

  return config;
}

module.exports = initConfig();
