import config from '~/src/lib/config';
import {
    GraphQLString
} from 'graphql';

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
            }
        }

        return schema;

    }
}

export default new TranslationService();
