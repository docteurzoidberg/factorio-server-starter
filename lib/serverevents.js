var factorio = require("./factorio");
var events = require("events");
var eventEmitter = new events.EventEmitter();

var lastRunning = null;
var lastPlayerStatuses = [];

function checkPlayerStatus(player) {
	var lastPlayerStatus = lastPlayerStatuses[player.Name];
        if(lastPlayerStatus==null) {
        	lastPlayerStatus = player.Online;
                lastPlayerStatuses[player.Name]=player.Online;
        }
        if(lastPlayerStatus!==player.Online){
	        if(player.Online) {
        		//event player login
			eventEmitter.emit('playerlogin', player);
	        } else {
        	        //event player logout
			eventEmitter.emit('playerlogout', player);
	        }
		lastPlayerStatuses[player.Name] = player.Online;
	}
}

function getStatus() {
	factorio.getStatus(function(err,status) {

		//error event
		if(err) {
			eventEmitter.emit('error', err);
			return;
		}

		//check each player status event
		status.players.map(checkPlayerStatus);

		//check running event
		if(lastRunning==null) lastRunning=status.running;	
		if(lastRunning!=status.running) {
			if(status.running) {
				//event server start
				eventEmitter.emit('serverstart', status.pid);
			} else {
				//event server stop
				eventEmitter.emit('serverstop');
			}
			lastRunning = status.running;
		}

	});
}

setInterval(getStatus,1000);

module.exports = eventEmitter;
