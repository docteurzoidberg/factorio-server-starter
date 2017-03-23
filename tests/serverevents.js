var events = require("../serverevents");

events.on('error', function(err) {
        console.error(err);
});

events.on('serverstart', function(pid) {
        console.log("Server started (pid=" + pid+")");
});

events.on('serverstop', function(pid) {
        console.log("Server stopped");
});

events.on('playerlogin', function(player) {
        console.log("Player " + player.Name + " joined");
});

events.on('playerlogout', function(player) {
        console.log("Player " + player.Name + " left");
});

