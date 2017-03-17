var fs = require("fs");
var spawn = require('child_process').spawn;
var ps = require("ps-node");
var crypto = require("crypto");

var Factorio = {};

var home = "/home/factorio/factorio";
var process= home + "/bin/x64/factorio";
var args=["--start-server", home + "/saves/leekwarstorio.zip"];

Factorio.getStatus = function(callback) {
    ps.lookup({command:"factorio", psargs: "ux"}, function(err, list) {

        if(err) return callback(err);

        var returnObj = {
            running: false,
            pid: null,
            playerCount: 0
        };

	    if(!list[0])
	        return callback(false, returnObj);

        returnObj.pid = list[0].pid;

        fs.readFile(home + '/script-output/playerscount.txt', function(err, data) {

            if(err)
                return callback(err, returnObj);

            returnObj.playercount = parseInt(data, 10);
            return callback(false, returnObj);
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
            spawn(process, args, {detached: true, cwd:"/home/factorio/factorio"});
            callback(false, "Started");
        });
    });
};

module.exports = Factorio;
