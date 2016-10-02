import { DbService } from './services';
import { PageModel } from './models'

DbService.connect();

let promises = [];

for (let i = 0; i < 10; i++) {
    promises.push(
        PageModel.create({
            name: 'prueba'
        })
    );
}

//////////
// DONE //
//////////
Promise.all(promises)
.then(function(){
	console.log('All done');
    DbService.disconnect();
})
.catch(function(err){
	console.log(err);
});
