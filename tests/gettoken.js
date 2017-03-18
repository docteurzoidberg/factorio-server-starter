var factorio = require('../factorio');

factorio.generateToken(function(err, token) {
  if(err) {
	console.error(err);
	return;
  }

  console.log("Token: " + token);
});
