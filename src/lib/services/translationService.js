const config = require('../../lib/config');
const { GraphQLString } = require('graphql');

class TranslationService {
  constructor() {
    this.translations = config.translations;
  }
  getTranslations() {
    return this.translations;
  }
  generateSchema() {
    let schema = {};

    for (let i = 0; i < this.translations.length; i++) {
      let translate = this.translations[i];
      schema[translate] = {
        type: GraphQLString
      };
    }

    return schema;
  }
}

module.exports = new TranslationService();
