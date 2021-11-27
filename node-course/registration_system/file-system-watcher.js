var chokidar = require('chokidar');

listen = function(callback){
var watcher = chokidar.watch('.', {ignored: /^\./, persistent: true});

watcher.on('add', function(path){callback(path)})

}

module.exports = listen;