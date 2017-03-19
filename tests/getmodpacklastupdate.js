var factorio = require("../factorio");

factorio.getModpackLastUpdate(function(err, lastupdate) {
	if(err) {
		console.error(err);
		return;
	}
	console.log(lastupdate);
});
