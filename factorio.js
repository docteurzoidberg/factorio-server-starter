var fs = require("fs");
var spawn = require('child_process').spawn;
var ps = require("ps-node");
var crypto = require("crypto");

var Factorio = {};

var process='/home/factorio/factorio/bin/x64/factorio';
var args=['--start-server', '/home/factorio/factorio/saves/leekwarstorio.zip'];

Factorio.getStatus = function(callback) {
    ps.lookup({command:"factorio", psargs: "ux"}, function(err, list) {
        if(err) return callback(err);
        //console.dir(list);
	if(list[0]) {
	    return callback(false, {running: true, pid: list[0].pid});
        }
        return callback(false, {running: false, pid: null});
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
