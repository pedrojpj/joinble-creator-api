const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const PlatformModel = require('./platformModel');
const { PlatformsSchema } = require('./platformSchema');
const { ErrorService } = require('../../../lib/services');

const PlatformQuery = {
  platforms: {
    type: new List(PlatformsSchema),
    async resolve(root, args) {
      return await PlatformModel.find();
    }
  }
};

module.exports = PlatformQuery;
