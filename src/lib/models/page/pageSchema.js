import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import { TranslationSchema } from '../translation';

const Seo = new GraphQLObjectType({
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

const Page = new GraphQLObjectType({
    name: 'Page',
    description: 'This represent a Page',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type:  GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        app: {
            type: GraphQLID
        },
        seo: {
            type: Seo
        },
        createdAt: {
            type: GraphQLString
        },
        updateAt: {
            type: GraphQLString
        }
    }
})

export default Page;
