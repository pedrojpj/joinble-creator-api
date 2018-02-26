const { GraphQLList: List, GraphQLBoolean: Boolean } = require('graphql');

const WidgetModel = require('./widgetModel');
const WidgetSchema = require('./widgetSchema');

const { ErrorService } = require('../../../lib/services');

const WidgetQuery = {
  widgets: {
    type: new List(WidgetSchema),
    resolve(root, args) {
      //ErrorService.secure(root);
      return WidgetModel.find();
    }
  }
};

module.exports = WidgetQuery;
