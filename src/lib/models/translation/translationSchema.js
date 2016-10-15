import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import { TranslationService } from '~/src/lib/services';

const Translation = new GraphQLObjectType({
    name: 'Translation',
    description: 'This represent a Translation',
    fields: TranslationService.generateSchema()
})

export default Translation;
