const { GraphQLInputObjectType, GraphQLString } = require('graphql');

const { TranslationService } = require('../../../lib/services');

const TranslationInput = new GraphQLInputObjectType({
  name: 'TranslationInput',
  fields: TranslationService.generateSchema()
});

module.exports = TranslationInput;
