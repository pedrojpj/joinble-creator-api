import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLID
} from 'graphql';

const ErrorSchema = new GraphQLObjectType({
    name: 'ErrorSchema',
    fields: {
        key: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) }
    }
})

export default ErrorSchema;
