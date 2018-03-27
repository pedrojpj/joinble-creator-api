const ElementsData = require('./dataFixtures/elements.json');
const ElementModel = require('./models/element/elementModel');

const WidgetsData = require('./dataFixtures/widgets.json');

const { UserModel } = require('./models/user');
const { WidgetModel } = require('./models/widget');
const { DbService, SecureService } = require('./services');

const debug = require('debug')('JOINBLE');

DbService.connect();

let promises = [];

async function generateUser() {
  let user = await UserModel.findOne({ name: 'Pedro José Peña' });

  if (!user) {
    promises.push(
      UserModel.create({
        name: 'Pedro José Peña',
        email: 'malagactiva@gmail.com',
        password: SecureService.encodePassword('1234')
      })
    );
  }
}

async function generateElements() {
  for (let element of ElementsData.elements) {
    let elem = await CheckComponent(element);

    if (elem) {
      promises.push(
        ElementModel.findOneAndUpdate({ name: elem.name }, { $set: element })
      );
    } else {
      promises.push(ElementModel.create(element));
    }
  }
}

async function generateWidgets() {
  for (let widget of WidgetsData.widgets) {
    let wg = await WidgetModel.findOne({ selector: widget.selector });

    if (wg) {
      promises.push(
        WidgetModel.findOneAndUpdate(
          { selector: widget.selector },
          { $set: widget }
        )
      );
    } else {
      promises.push(WidgetModel.create(widget));
    }
  }
}

async function CheckComponent(elem) {
  let query = await ElementModel.findOne({ name: elem.name });
  return query;
}

async function executeTasks() {
  await generateUser();
  await generateElements();
  await generateWidgets();

  Promise.all(promises)
    .then(function() {
      console.log('All done');
      process.exit();
    })
    .catch(function(err) {
      console.log(err);
      process.exit();
    });
}

executeTasks();
