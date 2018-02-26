const { GraphQLInputObjectType } = require('graphql');

const { TranslationInput } = require('../translation');

const SeoInput = new GraphQLInputObjectType({
  name: 'SeoInput',
  fields: {
    title: {
      type: TranslationInput
    },
    description: {
      type: TranslationInput
    },
    keywords: {
      type: TranslationInput
    }
  }
});

module.exports = SeoInput;
