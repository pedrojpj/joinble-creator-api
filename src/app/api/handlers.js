import config from '~/src/lib/config';
import { JsonService } from '~/src/lib/services';

const debug = require('debug')(config.appName+':handlers');

export default function(app){

	//404 and 500
   	app.use(function(req,res,next){
   		debug('404',req.url);
   		res.status(404).json(JsonService.errorResponse(404,'Route not found'));
   	});

   	/**
   	 * Error catch
   	 */
   	app.use(function(err,req,res,next){

   		//Error body
   		var errorData;
   		if (err instanceof Error){
   			errorData = {
   				name :err.name,
   				message :err.message,
   				stack :err.stack.split('\n')
   			};
   		}else{
   			errorData = err;
   		}

   		//Server log
   		debug('-------- error ocurred -------------------');
   		debug(errorData);


   		//Response
   		var showErrors = config.debug;
   		var errorResponse = JsonService.errorResponse(500, showErrors ? errorData : 'There was an error');

   		try{
   			res.json(errorResponse);
   		}catch(e){
   			debug('Error not sent, headers already sent');
   		}
   		res.end();
   	});

};
