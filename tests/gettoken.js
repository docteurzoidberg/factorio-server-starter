var factorio = require('../lib/factorio');

factorio.generateToken(function(err, token) {
  if(err) {
	console.error(err);
	return;
  }

  console.log("Token: " + token);
});
