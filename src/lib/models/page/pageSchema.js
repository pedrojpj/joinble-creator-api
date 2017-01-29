import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import { SeoSchema } from '../seo';

export const PageSchema = new GraphQLObjectType({
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
        createdAt: {
            type: GraphQLString
        },
        updateAt: {
            type: GraphQLString
        }
    }
})

export default PageSchema;
