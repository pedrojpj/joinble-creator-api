import ElementsData  from './dataFixtures/elements.json'
import ElementModel from './models/element/elementModel'

import WidgetsData  from './dataFixtures/widgets.json'

import { UserModel } from './models/user'
import { WidgetModel } from './models/widget';
import { DbService, SecureService } from './services'

DbService.connect();

let promises = [];

async function generateUser() {

    let user =  await UserModel.findOne({name: 'Pedro José Peña'});

    if (!user) {
        promises.push(
            UserModel.create({
                name: 'Pedro José Peña',
                email: 'pedro.jose@gigigo.com',
                password: SecureService.encodePassword('gigigo')
            })
        );
    }
}



async function generateElements() {
    for (let element of ElementsData.elements) {
        let elem = await CheckComponent(element);

        if (elem) {
            promises.push(
                ElementModel.findOneAndUpdate({name: elem.name}, {$set: element})
            )
        } else {
            promises.push(
                ElementModel.create(element)
            )
        }
    }
}

async function generateWidgets() {
    for (let widget of WidgetsData.widgets) {
        let wg = await WidgetModel.findOne({selector: widget.selector})

        if (wg) {
            promises.push(
                WidgetModel.findOneAndUpdate({selector: widget.selector}, {$set: widget})
            )
        } else {
            promises.push(
                WidgetModel.create(widget)
            )
        }
    }
}


generateUser();
generateElements();
generateWidgets();

async function CheckComponent(elem) {
    let query = await ElementModel.findOne({ name: elem.name });
    return query;
}


//////////
// DONE //
//////////
Promise.all(promises)
.then(function(){
	console.log('All done');
    process.exit();
})
.catch(function(err){
	console.log(err);
    process.exit();
})
