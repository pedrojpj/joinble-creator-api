import { DbService, SecureService } from './services';
import { UserModel } from './models/user';
import { ComponentModel } from './models/component';
import ComponentsData from './dataFixtures/components.json';

DbService.connect();

let promises = [];

    promises.push(
        UserModel.create({
            name: 'Pedro José Peña',
            email: 'pedro.jose@gigigo.com',
            password: SecureService.encodePassword('gigigo')
        })
    );

    for (let component of ComponentsData.components) {
        console.log(component);
        let componentModel = new ComponentModel(component);
        promises.push(
            componentModel.save()
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
