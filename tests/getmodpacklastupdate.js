var factorio = require("../lib/factorio");

factorio.getModpackLastUpdate(function(err, lastupdate) {
	if(err) {
		console.error(err);
		return;
	}
	console.log(lastupdate);
});
