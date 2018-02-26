const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const AppModel = require('./appModel');
const { AppSchema } = require('./appSchema');
const { ErrorService } = require('../../../lib/services');

const AppQuery = {
  apps: {
    type: new GraphQLList(AppSchema),
    async resolve(root, args) {
      ErrorService.secure(root);
      return await AppModel.find({ user: root.user._id });
    }
  },
  app: {
    type: AppSchema,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root, args) {
      ErrorService.secure(root);
      return await AppModel.findOne({ user: root.user._id, _id: args.id });
    }
  }
};

module.exports = AppQuery;
