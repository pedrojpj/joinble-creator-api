import { DbService, SecureService } from './services';
import { UserModel } from './models/user';

DbService.connect();

let promises = [];

console.log(SecureService.encodePassword('gigigo'));

    promises.push(
        UserModel.create({
            name: 'Pedro José Peña',
            email: 'pedro.jose@gigigo.com',
            password: SecureService.encodePassword('gigigo')
        })
    );


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
