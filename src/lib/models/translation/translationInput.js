import {
    GraphQLInputObjectType,
    GraphQLString
} from 'graphql';

import { TranslationService } from '~/src/lib/services';


const TranslationInput = new GraphQLInputObjectType({
    name: 'TranslationInput',
    fields: TranslationService.generateSchema()
})

export default TranslationInput;
