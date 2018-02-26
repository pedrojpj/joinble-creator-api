//Globals
global.__basedir = __dirname;
global.params = require('../package.json');
const express = require('express');
const config = require('./lib/config');
const { DbService } = require('./lib/services');
const api = require('./app/api');

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
