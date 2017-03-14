var fs = require("fs");
var cmd=require('node-cmd');
var crypto = require("crypto");

var Factorio = {};

var serverPath='/home/factorio/factorio/';
var serverCmd = './bin/x64/factorio --start-server ./saves/leekwarstorio.zip';

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
        cmd.run(serverPath+serverCmd);
        callback(false, "Started");
    });
};

module.exports = Factorio;