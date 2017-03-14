var express = require('express');
var router = express.Router();
var factorio = require('../factorio');
var zipFolder = require('zip-folder');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', serverstatus: req.serverstatus  });
});

router.get("/modpack", function(req,res,next) {

    zipFolder('/home/factorio/factorio/mods', '/home/factorio/www/public/modpack.zip', function(err) {
	if(err) {
        	console.log('oh no!', err);
	} else {
        	console.log('EXCELLENT');
		res.redirect("/modpack.zip");
	}
    });

});


/* POST start server. */
router.post('/start', function(req, res, next) {
  var token = req.body.token || "";

  console.log(token);

  factorio.checkToken(token, function(err) {
    if(err) return next(err);
    factorio.startServer(token, function(err, status) {
        if(err) return next(err);
        res.render('index', { title: 'Express', status: status, serverstatus: req.serverstatus });
    });
  });
});

module.exports = router;
