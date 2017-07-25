import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from '../config';

const debug = require('debug')(config.APP_NAME);

mongoose.Promise = Promise;

class DbService {
   constructor() {
      this._connected = false;
      this.retries = 0;
      this.uri = config.DB_URI;
   }
   connected() {
      return this._connected;
   }
   connect() {
      mongoose.createConnection(this.uri, { useMongoClient: true });

      mongoose.connection
         .on('error', () => {
            debug('mongodb connect error');
            debug('try connect');
         })
         .on('open', db => {
            debug('mongodb connected');
            this._connected = true;
         })
         .on('disconnected', () => {
            this._connected = false;
            setTimeout(this.connect, 5000);
         });

      mongoose.set('debug', config.DEBUG);
   }

   disconnect() {
      mongoose.disconnect();
   }
}

export default new DbService();
