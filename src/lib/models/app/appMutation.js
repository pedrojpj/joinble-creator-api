const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean
} = require('graphql');

const validator = require('validator');
const mongoose = require('mongoose');

const { AppSchema, Platforms } = require('./appSchema');
const AppModel = require('./appModel');
const { ErrorSchema } = require('../error');
const { ImageSchema } = require('../image');
const { ErrorService } = require('../../../lib/services');

const AppInput = new GraphQLInputObjectType({
  name: 'AppInput',
  fields: {
    id: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    platform: { type: new GraphQLNonNull(new GraphQLList(Platforms)) },
    domain: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
    languages: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  }
});

const AppMutation = {
  addApp: {
    type: AppSchema,
    args: {
      app: {
        type: new GraphQLNonNull(AppInput)
      }
    },
    async resolve(root, args) {
      ErrorService.secure(root);

      args.app.user = mongoose.Types.ObjectId(root.user.id);
      args.app.id = mongoose.Types.ObjectId(args.app.id);

      let app = await AppModel.findOne({ user: args.app.user, _id: args.app.id });

      if (app) {
        return await AppModel.findOneAndUpdate(
          { user: args.app.user, _id: args.app.id },
          { $set: args.app }
        );
      } else {
        let newApp = new AppModel(args.app);
        return await newApp.save();
      }
    }
  },
  deleteApp: {
    type: new GraphQLObjectType({
      name: 'deleteApp',
      fields: {
        status: { type: GraphQLBoolean }
      }
    }),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    async resolve(root, args) {
      let status = true;

      ErrorService.secure(root);

      args.user = mongoose.Types.ObjectId(root.user.id);
      args._id = mongoose.Types.ObjectId(args.id);
      let deleteApp = await AppModel.find({ user: args.user, _id: args._id }).remove();

      if (!deleteApp) {
        status = false;
      }

      return { status };
    }
  }
};

module.exports = AppMutation;
