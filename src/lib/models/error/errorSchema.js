import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

const Error = new GraphQLObjectType({
    name: 'Error',
    description: 'This represent a Error',
    fields: {
        key: { type:  GraphQLString },
        message: { type:  GraphQLString }
    }
})

export default Error;
