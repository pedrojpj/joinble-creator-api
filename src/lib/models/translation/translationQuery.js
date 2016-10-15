import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import { ErrorService, TranslationService } from '~/src/lib/services';

const TranslationQuery = {
    translations: {
        type: new GraphQLList(GraphQLString),
        resolve(root, args) {
            return TranslationService.getTranslations();
        }
    }
}

export default TranslationQuery;
