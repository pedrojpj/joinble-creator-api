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
        label : {
            type: TranslationInput
        },
        required: {
            type: Boolean
        }
    }
})

const WidgetInput = new InputObjectType({
    name: 'WidgetInput',
    fields: {
        id: {
            type: new NonNull(ID)
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        content: {
            type: new List(ContentInput)
        },
        repeat: {
            type: Boolean
        },
        mode: {
            type: String
        }
    }
})

export default WidgetInput;
