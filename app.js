var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var factorio = require("./factorio");

//Main controller
var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var getModpackLastUpdate = function(req,res,next) {
  factorio.getModpackLastUpdate(function(err, lastupdate) {
    if(err) return next(err);
    req.modpackLastUpdate = lastupdate;
    next(false, req);
  });
};

var getServerStatus = function(req, res, next) {
  factorio.getStatus(function(err, status) {
    if(err) return next(err);
    req.serverstatus = status;
    next(false, req);
  });
};

app.use(getModpackLastUpdate);
app.use(getServerStatus);
app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
