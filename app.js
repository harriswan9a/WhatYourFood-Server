var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');

// api v1
var food = require('./routes/v1/food');
var search = require('./routes/v1/search');
var restaurant = require('./routes/v1/restaurant');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// api v1
app.use('/api/v1/help', function (req, res, next) {
  //跑版
  // var showdown  = require('showdown'),
  //   converter = new showdown.Converter(),
  //   // text      = '#hello, markdown!',
  //   text      = fs.readFileSync('./routes/v1/help.md', "utf8"),
  //   html      = converter.makeHtml(text);

  //跑版
  // var markdown = require( "markdown" ).markdown;
  // var html = markdown.toHTML(fs.readFileSync('./routes/v1/help.md', "utf8"));

  //堪用..
  // var marked = require('marked');
  // var html = marked(fs.readFileSync('./routes/v1/help.md', "utf8"));

  //使用jade會有 &quot; 符號問題
  // var markdownText = fs.readFileSync('./routes/v1/help.md', "utf8");
  // res.render('md', {content: markdownText});

  // OK
  var markdownText = fs.readFileSync('./routes/v1/help.md', "utf8");
  var html = `<!DOCTYPE html><html><title>Minithon2 B Team</title><xmp theme="united" style="display:none;"> ${markdownText} </xmp><script src="/javascripts/strapdown.js"></script></html>`
  res.send(html);
  
});

app.use(function (req, res, next) {
  var uid = req.query['uid'];
  if (uid === null || typeof (uid) === 'undefined') {
    res.sendStatus(401);
  } else {
    next();
  }
});
app.use('/api/v1/food', food);
app.use('/api/v1/search', search);
app.use('/api/v1/restaurant', restaurant);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
