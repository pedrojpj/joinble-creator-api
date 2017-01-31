import {
    GraphQLNonNull,
    GraphQLString,
    GraphQlInt,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLID
} from 'graphql';

const PageInput = new GraphQLInputObjectType({
    name: 'PageInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
        app: { type: new GraphQLNonNull(GraphQLID) },
        active: { type: new GraphQLNonNull(GraphQLBoolean) },
        primary: { type: GraphQLBoolean }
    }
})

export default PageInput;
