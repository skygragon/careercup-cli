var _ = require('underscore');
var chalk = require('chalk');
var cheerio = require('cheerio');
var request = require('request');
var sprintf = require('sprintf-js').sprintf;

var config = require('./config');
var h = require('./helper');

var CareerCupClient = {};

function makeOpts(url) {
  return {
    url:     url,
    headers: {
      'user-agent': 'Mozilla/5.0'
    }
  };
}

function onPage(e, wctx, gctx, cb) {
  console.log(sprintf('[%2d] Page: %-7d', wctx.id, wctx.page),
      chalk.yellow(sprintf('Found: %-7s', h.prettyNumber(wctx.found))),
      chalk.red(sprintf('Dedup: %-7s', h.prettyNumber(wctx.dedup))),
      chalk.green(sprintf('New: %-7s', h.prettyNumber(wctx.add)))
      );
  gctx.count += (wctx.add || 0);

  if (e) {
    gctx.pages.unshift(wctx.page);
  } else if (wctx.found === 0) {
    // no more questions, let worker quit
    gctx.done += 1;
    gctx.workers[wctx.id] = wctx.page;
    if (gctx.done === config.QUESTIONS_WORKERS) cb(null, gctx);
    return false;
  }

  return true;
}

function getQuestionsOnPage(wctx, gctx, cb) {
  // keep trying more pages
  if (gctx.pages.length === 0) {
    gctx.pages = _.range(gctx.nextPage, gctx.nextPage + 100);
    gctx.nextPage += 100;
  }

  wctx.found = wctx.dedup = wctx.add = null;
  wctx.page = gctx.pages.shift();

  var url = sprintf(config.QUESTIONS_URL, wctx.page);
  var db = gctx.db;

  request(makeOpts(url), function(e, resp, body) {
    if (e) return cb(e, wctx);
    if (resp.statusCode !== 200) return cb('HTTP fail' + resp.statusCode, wctx);

    var $ = cheerio.load(body);
    var questions = $('li[class="question"]').map(function() {
      var self = $(this);
      var question = {
        link:    self.find('span[class="entry"] a').first().attr('href'),
        data:    self.find('span[class="entry"] a').first().text(),
        time:    self.find('abbr[class="timeago"]').attr('title'),
        company: self.find('span[class="company"] img').attr('title'),
        tags:    self.find('span[class="tags"] a').map(function() {
          return $(this).text();
        }).get()
      };

      question.id = _.last(question.link.split('id='));
      question.link = config.BASE_URL + question.link;
      question.rand = Math.random();

      return question;
    }).get();

    wctx.found = questions.length;
    var ids = _.pluck(questions, 'id');

    db.find({id: {$in: ids}}, function(e, oldQuestions) {
      if (e) return cb(e, wctx);

      wctx.dedup = oldQuestions.length;
      var existIds = _.pluck(oldQuestions, 'id');

      var newQuestions = _.filter(questions, function(q) {
        return existIds.indexOf(q.id) === -1;
      });

      db.insert(newQuestions, function(e, addedQuestions) {
        if (e) return cb(e, wctx);

        wctx.add = addedQuestions.length;
        var next = cb(null, wctx);

        if (next)
          setImmediate(getQuestionsOnPage, wctx, gctx, cb);
      });
    });
  });
}

CareerCupClient.updateQuestions = function(cb) {
  h.getDB('questions', function(e, db) {
    if (e) return cb(e);

    var gctx = {
      db:       db,
      count:    0,
      done:     0,
      workers:  [],
      pages:    [],
      nextPage: 1
    };
    var gcb = _.partial(onPage, _, _, gctx, cb);

    for (var i = 0; i < config.QUESTIONS_WORKERS; ++i) {
      var wctx = {id: i};
      setImmediate(getQuestionsOnPage, wctx, gctx, gcb);
    }
  });
};

module.exports = CareerCupClient;
