var util = require("util");
var fs = require("fs");
var path = require("path");
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var ps = require("ps-node");
var crypto = require("crypto");

var Factorio = {};

var home = "/home/factorio/factorio";
var process= home + "/bin/x64/factorio";
var args=["--start-server", home + "/saves/leekwarstorio.zip"];


Factorio.getModpackLastUpdate = function(callback) {
	fs.stat("/home/factorio/www/public/modpack.zip", function(err, stats) {
		var mtime = new Date(util.inspect(stats.mtime));
		return callback(err, mtime.toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	});		
};

Factorio.getPlayers = function(callback) {
    var  p = home + "/script-output/players";
    fs.readdir(p, function (err, files) {
        if (err)
            return callback(err);

        var players = [];

        files.map(function (file) {
            return path.join(p, file);
         }).filter(function (file) {
            return fs.statSync(file).isFile();
        }).forEach(function (file) {
            var player = JSON.parse(fs.readFileSync(file));
	    if(player.Online)
		players.push(player);
        });

        callback(false, players);
    });
};

Factorio.getStatus = function(callback) {
    ps.lookup({command:"factorio", psargs: "ux"}, function(err, list) {

        if(err) return callback(err);

        var returnObj = {
            running: false,
            pid: null,
            playercount: 0,
 	    players: []
        };

	    if(!list[0])
	        return callback(false, returnObj);

        returnObj.running = true;
        returnObj.pid = list[0].pid;

        fs.readFile(home + '/script-output/playerscount.txt', function(err, data) {
            if(err)
                return callback(err, returnObj);
            
	    returnObj.playercount = parseInt(data, 10);

	    Factorio.getPlayers(function(err, players) {
		if(err) {
			return callback(err, returnObj);
		}
		returnObj.players = players;
	        return callback(false, returnObj);   	
	    });

        });
    });
};

Factorio.generateToken = function(callback) {
    var token = crypto.randomBytes(20).toString('hex');
    fs.writeFile('./tokens/' + token + '.txt', function(err) {
        if(err) return callback(err);
        callback(false, token);
    });
};

Factorio.checkToken = function(token, callback) {
    fs.stat('./tokens/' + token + '.txt', function(err, stats) {
        if(err) return callback(new Error('Invalid token provided'));
        callback(false);
    });
};

Factorio.startServer = function(token, callback) {
    Factorio.getStatus(function(err, status) {
        if(err)
            return callback(err);
        if(status.running==true) 
            return callback(new Error('Server already started'));

        fs.unlink('./tokens/' + token + '.txt', function(err) {
            if(err) return callback(err);
            spawn(process, args, {stdio: 'ignore', detached: true, cwd:"/home/factorio/factorio"}).unref();
            callback(false, "Started");
        });
    });
};

Factorio.stopServer = function(callback) {
    Factorio.getStatus(function(err, status) {
        if(err) return callback(err);
	if(!status.running)
      	    return callback(new Error('Server not started'));	
        exec("/bin/kill -s SIGINT "+ status.pid, {});
        callback(false, "Stoped");
    });    
};

module.exports = Factorio;
