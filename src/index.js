//Globals
global.__basedir = __dirname;
global.params = require('~/package.json');

const debug = require('debug')(config.appName);

//Dependencies
import express from 'express';

//Libraries
import config from './lib/config';

//services
import { DbService } from './lib/services';

DbService.connect();

///apps

// API APP
import api from './app/api';

const apiApp = express();
const apiPort = config.apps.api.port;

api.middlewares(apiApp);
api.routes(apiApp);
api.handlers(apiApp);

apiApp.listen(apiPort,function(){
	console.log(`>>> API http listening ${apiPort}`);
});
