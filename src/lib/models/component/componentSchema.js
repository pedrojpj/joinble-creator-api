import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} from 'graphql';

export const ComponentSchema = new GraphQLObjectType({
    name: 'Component',
    description: 'This represent a Component',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        selector: {
            type: GraphQLString
        },
        childs: {
            type: new GraphQLList(GraphQLString)
        },
        updateAt: {
            type: GraphQLString
        }
    }
})

export default ComponentSchema;
