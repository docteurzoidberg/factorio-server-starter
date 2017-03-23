var factorio = require('../lib/factorio');

factorio.generateToken(function(err, token) {

	if(err) {
		console.error(err);
		return;
	}

	factorio.startServer(token, function(err, status) {
		if(err) {
			console.error(err);
			return;
		}
		console.log("Server: " + status);
	});
});
