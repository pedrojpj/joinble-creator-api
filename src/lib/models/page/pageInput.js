import {
    GraphQLNonNull as NonNull,
    GraphQLString as String,
    GraphQlInt as Int,
    GraphQLInputObjectType as InputObjectType,
    GraphQLBoolean as Boolean,
    GraphQLID as ID,
    GraphQLList as List
} from 'graphql';

import { WidgetInput } from '../widget'

const PageInput = new InputObjectType({
    name: 'PageInput',
    fields: {
        id: { type: ID },
        name: { type: new NonNull(String) },
        slug: { type: new NonNull(String) },
        app: { type: new NonNull(ID) },
        active: { type: new NonNull(Boolean) },
        widgets: { type: new List(WidgetInput) },
        primary: { type: Boolean }
    }
})

export default PageInput;
