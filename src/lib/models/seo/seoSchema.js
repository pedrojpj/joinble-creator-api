const { GraphQLObjectType } = require('graphql');

const { TranslationSchema } = require('../translation');

const SeoSchema = new GraphQLObjectType({
  name: 'Seo',
  description: 'This represent seo content of Page',
  fields: {
    title: {
      type: TranslationSchema
    },
    description: {
      type: TranslationSchema
    },
    keywords: {
      type: TranslationSchema
    }
  }
});

module.exports = SeoSchema;
