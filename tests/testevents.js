var factorio = require("../factorio");

var lastRunning = null;
vat lastPlayerStatuses = [];

function getStatus() {
	factorio.getStatus(function(err,status) {

		if(err) {
			console.error("Error while getting status:");
			console.error(err);
			return;
		}

		status.players.map(function(player) {
			var lastPlayerStatus = lastPlayerStatuses[player.Name];
			if(lastPlayerStatus==null) {
				lastPlayerStatus = player.Online;
				lastPlayerStatuses[player.Name]=player.Online;
			}
			if(lastPlayerStatus!==player.Online){
				if(player.Online) {
					//event player login
				} else {
					//even player logout
				}
			}
			

		});

		if(lastRunning==null) lastRunning=status.running;	
		if(lastRunning!=status.running) {
			if(status.running) {
				//event server start
			} else {
				//event server stop
			}
		}

	});
}

setInterval(getStatus,1000);
