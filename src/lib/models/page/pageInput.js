import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLID
} from 'graphql';

const PageInput = new GraphQLInputObjectType({
    name: 'PageInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
        app: { type: new GraphQLNonNull(GraphQLID) }
    }
})

export default PageInput;
