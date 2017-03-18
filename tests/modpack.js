var zipFolder = require('zip-folder');

zipFolder('/home/factorio/factorio/mods', '/home/factorio/www/public/modpack.zip', function(err) {
    if(err) {
        console.log('oh no!', err);
    } else {
        console.log('EXCELLENT');
    }
});
