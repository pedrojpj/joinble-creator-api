import {
    GraphQLNonNull as NonNull,
    GraphQLString as String,
    GraphQlInt as Int,
    GraphQLInputObjectType as InputObjectType,
    GraphQLBoolean as Boolean,
    GraphQLID as ID,
    GraphQLList as List
} from 'graphql';

import { TranslationInput } from '../translation'

const ContentInput = new InputObjectType({
    name: 'ContentInput',
    fields: {
        component: {
            type: String
        },
        name: {
            type: String
        },
        value: {
            type: String
        },
        label : {
            type: TranslationInput
        },
        required: {
            type: Boolean
        },
        repeat: {
            type: Boolean
        }
    }
})

const WidgetInput = new InputObjectType({
    name: 'WidgetInput',
    fields: {
        id: {
            type: new NonNull(String)
        },
        name: {
            type: String
        },
        description: {
            type: TranslationInput
        },
        content: {
            type: new List(ContentInput)
        },
        mode: {
            type: String
        },
        repeat: {
            type: Boolean
        }
    }
})

export default WidgetInput;
