import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql'

export const ElementSchema = new GraphQLObjectType({
    name: 'Element',
    description: 'This represent a Element',
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

export default ElementSchema;
