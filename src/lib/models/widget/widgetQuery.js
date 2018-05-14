const {
  GraphQLList: List,
  GraphQLBoolean: Boolean,
  GraphQLString: String,
  GraphQLNonNull: NonNull
} = require('graphql');

const WidgetModel = require('./widgetModel');
const WidgetSchema = require('./widgetSchema');
const { ErrorService } = require('../../../lib/services');

const WidgetQuery = {
  widgets: {
    type: new List(WidgetSchema),
    args: {
      type: { type: new NonNull(String) }
    },
    async resolve(root, args) {
      //ErrorService.secure(root);
      return await WidgetModel.find({ type: args.type });
    }
  }
};

module.exports = WidgetQuery;
