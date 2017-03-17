var factorio = require("../factorio");

factorio.getPlayers(function(err, players) {
	if(err) {
		console.error(err) 
		return;
	}
	console.dir(players);
});


