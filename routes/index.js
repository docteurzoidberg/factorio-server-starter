var express = require('express');
var router = express.Router();

var factorio = require('../factorio');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST start server. */
router.post('/start', function(req, res, next) {
  var token = req.body.token || "";

  console.log(token);

  factorio.checkToken(token, function(err) {
    if(err) return next(err);
    factorio.startServer(token, function(err, status) {
        if(err) return next(err);
        res.render('index', { title: 'Express', status: status });
    });
  });
});

module.exports = router;
