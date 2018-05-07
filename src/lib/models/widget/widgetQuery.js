const { GraphQLList: List, GraphQLBoolean: Boolean } = require('graphql');

const WidgetModel = require('./widgetModel');
const WidgetSchema = require('./widgetSchema');

const { ErrorService } = require('../../../lib/services');

const WidgetQuery = {
  widgets: {
    type: new List(WidgetSchema),
    root: {
      example: 1
    },
    async resolve(root, args) {
      //ErrorService.secure(root);
      return await WidgetModel.find({});
    }
  }
};

module.exports = WidgetQuery;
