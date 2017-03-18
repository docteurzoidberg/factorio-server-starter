var express = require('express');
var router = express.Router();
var factorio = require('../factorio');
var zipFolder = require('zip-folder');


/* GET status */
router.get('/status', function(req,res,next) {
    res.setHeader('Content-Type', 'application/json');
    factorio.getStatus(function(err, status) {
	if(err) {
		res.status(500);
		res.send(JSON.stringify(err));	
		return;
	}
	res.send(JSON.stringify(status));
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', serverstatus: req.serverstatus, modpackLastUpdate: req.modpackLastUpdate  });
});


/* GET modpack */
router.get("/modpack", function(req,res,next) {

    zipFolder('/home/factorio/factorio/mods', '/home/factorio/www/public/modpack.zip', function(err) {
	    if(err) {
            console.log('Failed to zip content: ', err);
            return next(err);
        }
        //serve file through http
		res.redirect("/modpack.zip");
    });

});


/* POST start server. */
router.post('/start', function(req, res, next) {

  var token = req.body.token || "";

  factorio.checkToken(token, function(err) {

    if(err) return next(err);

    factorio.startServer(token, function(err, status) {
        if(err) return next(err);
	factorio.getStatus(function(err, status) {
		if(err) return next(err);	
	        res.render('index', { title: 'Express', status: status, serverstatus: status, modpackLastUpdate: req.modpackLastUpdate });
	});
    });

  });

});

module.exports = router;
