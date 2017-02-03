var request = require('request');
var _ = require('underscore');

var config = require('./config');

var client = {};

client.sendToDaemon = function(func, args, cb) {
  var opts = {
    url: 'http://localhost:' + config.DAEMON_PORT,
    body: {
      func: func,
      args: args
    },
    json: true
  };

  request.post(opts, function(e, response, body) {
    if (response.statusCode !== 200)
      return cb('HTTP Error' + response.statusCode);

    cb.apply(null, body);
  });
};

// FIXME: ugly hack, any better solution?
RegExp.prototype.toJSON = function() {
  return this.toString().replace(/^\/(.*)\/i$/, '$1');
};

function wrapper() {
  var args = Array.prototype.slice.call(arguments);
  var func = args.shift();
  var cb = args.pop();
  this.sendToDaemon(func, args, cb);
};

client.count = _.partial(wrapper, 'count');
client.find = _.partial(wrapper, 'find');
client.findOne = _.partial(wrapper, 'findOne');
client.insert = _.partial(wrapper, 'insert');
client.update = _.partial(wrapper, 'update');

module.exports = client;
