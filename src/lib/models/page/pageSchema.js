import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as Int,
    GraphQLString as String,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as Boolean,
    GraphQLID as ID,
    GraphQLList as List
} from 'graphql';

import { SeoSchema } from '../seo';

import { WidgetSchema } from '../widget';

export const PageSchema = new ObjectType({
    name: 'Page',
    description: 'This represent a Page',
    fields: {
        id: {
            type: new NonNull(ID)
        },
        name: {
            type:  String
        },
        slug: {
            type: String
        },
        app: {
            type: ID
        },
        active: {
            type: Boolean
        },
        primary: {
            type: Boolean
        },
        createdAt: {
            type: String
        },
        updateAt: {
            type: String
        },
        widgets: {
            type: new List(WidgetSchema)
        }
    }
})

export default PageSchema;
