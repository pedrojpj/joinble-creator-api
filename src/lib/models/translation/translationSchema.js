const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const { TranslationService } = require('../../../lib/services');

const Translation = new GraphQLObjectType({
  name: 'Translation',
  description: 'This represent a Translation',
  fields: TranslationService.generateSchema()
});

module.exports = Translation;
