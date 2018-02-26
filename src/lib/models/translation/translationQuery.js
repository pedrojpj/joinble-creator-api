const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const { ErrorService, TranslationService } = require('../../../lib/services');

const TranslationQuery = {
  translations: {
    type: new GraphQLList(GraphQLString),
    resolve(root, args) {
      return TranslationService.getTranslations();
    }
  }
};

module.exports = TranslationQuery;
