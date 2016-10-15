import {
    GraphQLInputObjectType
} from 'graphql';

import { TranslationInput } from '../translation';

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
})

export default SeoInput;
