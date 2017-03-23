var factorio = require('../lib/factorio');

factorio.getStatus(function(err, status) {
    if(err) {
        console.error(err);
        return;
    }
    console.log("Status: ");
    console.dir(status);
});

