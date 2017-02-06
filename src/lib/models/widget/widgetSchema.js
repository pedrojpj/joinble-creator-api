import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as Integer,
    GraphQLString as String,
    GraphQLNonNull as Null,
    GraphQLList as List,
    GraphQLID as ID
} from 'graphql';

import { TranslationSchema } from '../translation';

const ContentSchema = new ObjectType({
    name: 'Content',
    description: 'This represent a Content of Widget',
    fields: {
        component: {
            type: String
        },
        name: {
            type: String
        },
        label : {
            type: TranslationSchema
        }
    }
})

const WidgetSchema = new ObjectType({
    name: 'Widget',
    description: 'This represent a Widget',
    fields: {
        id: {
            type: new Null(ID)
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        content: {
            type: new List(ContentSchema)
        },
        country: {
            type: String
        },
        address: {
            type: String
        }
    }
})

export default WidgetSchema
