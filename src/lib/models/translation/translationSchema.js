import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

const Translation = new GraphQLObjectType({
    name: 'Translation',
    description: 'This represent a Translation',
    fields: {
        es: {
            type: GraphQLString
        },
        en: {
            type: GraphQLString
        },
        fr: {
            type: GraphQLString
        },
        de: {
            type: GraphQLString
        }
    }
})

export default Translation;
