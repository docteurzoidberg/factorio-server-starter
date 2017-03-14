var fs = require("fs");
var exec = require('child_process').exec;
var crypto = require("crypto");

var Factorio = {};

var binPath = '/home/factorio/factorio/';
var cmd = binPath + "bin/x64/factorio --start-server ./saves/leekwarstorio.zip";


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
    fs.unlink('./tokens/' + token + '.txt', function(err) {
        if(err) return callback(err);
        exec(cmd);
        callback(false, "Started");
    });
};

module.exports = Factorio;