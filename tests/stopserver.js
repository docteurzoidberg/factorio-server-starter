var factorio = require('../lib/factorio');

factorio.stopServer(function(err, status) {

	if(err) {
		console.error(err);
		return;
	}

	console.log("Server: " + status);
});
