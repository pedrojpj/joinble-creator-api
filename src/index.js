//Globals
global.__basedir = __dirname;
global.params = require('../package.json');
const express = require('express');
const config = require('./lib/config');
const { DbService } = require('./lib/services');
const api = require('./app/api');

var production = process.env.NODE_ENV === 'production';
if (!production) {
  var chokidar = require('chokidar');
  var watcher = chokidar.watch('./src');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /src/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
}

const debug = require('debug')(config.appName);

DbService.connect();

///apps
const apiApp = express();
const apiPort = config.PORT;

api.middlewares(apiApp);
api.routes(apiApp);
api.handlers(apiApp);

apiApp.listen(apiPort, function() {
  console.log(`>>> API http listening ${apiPort}`);
  debug(`>>> API http listening ${apiPort}`);
});
