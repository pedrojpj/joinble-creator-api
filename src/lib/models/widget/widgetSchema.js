import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as Number,
    GraphQLString as String,
    GraphQLNonNull as Null,
    GraphQLList as List,
    GraphQLID as ID,
    GraphQLBoolean as Boolean
} from 'graphql';

import { TranslationSchema } from '../translation';

const OptionsSchema = new ObjectType({
    name: 'Options',
    description: 'Options of Content',
    fields: {
        formats: {
            type: new List(String)
        },
        maxSize: {
            type: Number
        }
    }
});


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
        },
        options: {
            type: OptionsSchema
        },
        required: {
            type: Boolean
        },
        value: {
            type: String
        },
        repeat: {
            type: Boolean
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
            type: TranslationSchema
        },
        content: {
            type: new List(ContentSchema)
        },
        repeat: {
            type: Boolean
        },
        mode: {
            type: String
        }
    }
})

export default WidgetSchema
