import {
    GraphQLObjectType
} from 'graphql';

import { TranslationSchema } from '../translation';

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
})

export default SeoSchema;
