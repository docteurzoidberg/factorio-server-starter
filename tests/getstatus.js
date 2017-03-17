var factorio = require('../factorio');

factorio.getStatus(function(err, status) {
    if(err) {
        console.error(err);
        return;
    }
    console.log("Status: ");
    console.dir(status);
});

