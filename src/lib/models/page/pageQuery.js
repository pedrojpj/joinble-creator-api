const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const PageModel = require('./pageModel');
const PageSchema = require('./pageSchema');

const { ErrorService } = require('../../../lib/services');

const PageQuery = {
  pages: {
    type: new GraphQLList(PageSchema),
    args: {
      app: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(root, args) {
      ErrorService.secure(root);
      return PageModel.find(args);
    }
  },
  page: {
    type: PageSchema,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root, args) {
      ErrorService.secure(root);
      return await PageModel.findOne({ _id: args.id });
    }
  }
};

module.exports = PageQuery;
