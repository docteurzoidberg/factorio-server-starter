var fs = require("fs");
var spawn = require('child_process').spawn;
var crypto = require("crypto");

var Factorio = {};

var process='/home/factorio/factorio/bin/x64/factorio';
var args=['--start-server', '/home/factorio/factorio/saves/leekwarstorio.zip'];

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
        spawn(process, args);
        callback(false, "Started");
    });
};

module.exports = Factorio;
