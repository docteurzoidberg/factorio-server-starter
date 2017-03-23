var config = require("./discord-credentials.js"); //not on github :)
var events = require("./serverevents");

var discord = require("discord.js");
var discordhook = new discord.WebhookClient(config.id, config.token);

events.on('error', function(err) {
        console.error(err);
});

events.on('serverstart', function(pid) {	
        console.log("Server started (pid=" + pid+")");
	discordhook.sendMessage("Factorio server is started, GOGOGO :)");
});

events.on('serverstop', function(pid) {
        console.log("Server stopped");
	discordhook.sendMessage("Factorio server is stopped for maintenance :'(");
});

events.on('playerlogin', function(player) {
        console.log("Player " + player.Name + " joined");
	discordhook.sendMessage("Player " + player.Name + " joined the server :)");
});

events.on('playerlogout', function(player) {
        console.log("Player " + player.Name + " left");
	discordhook.sendMessage("Player " + player.Name + " left the server :(");
});


