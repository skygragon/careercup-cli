var app = require('express')();
var bodyParser = require('body-parser');
var _ = require('underscore');

var config = require('./config');
var h = require('./helper');

app.use(bodyParser.json());
config.USE_DAEMON = false;  // we are already in daemon

// FIXME: ugly hack, any better solution?
function fixRegExp(obj) {
  if (!_.isObject(obj)) return;
  for (var k in obj) {
    if (k === '$regex') {
      obj[k] = new RegExp(obj[k], 'i');
    }
    fixRegExp(obj[k]);
  }
}

app.post('/', function(req, res) {
  var func = req.body.func;
  var args = req.body.args;

  fixRegExp(args);
  console.log('received:', func, args);

  if (func === 'stop') {
    res.send(JSON.stringify([null, 'ok']));
    setTimeout(function() {
      process.exit(0);
    }, 1000);
    return;
  }

  h.getDB('questions', function(e, db) {
    if (e) return res.status(500).send(e);

    args.push(function() {
      var results = Array.prototype.slice.call(arguments);
      res.send(JSON.stringify(results));
    });
    db[func].apply(db, args);
  });
});

app.listen(config.DAEMON_PORT);
