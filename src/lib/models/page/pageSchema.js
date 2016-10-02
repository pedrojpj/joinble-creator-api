import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

const Page = new GraphQLObjectType({
    name: 'Page',
    description: 'This represent a Page',
    fields: () => {
        return {
            _id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            }
        }
    }
})

export default Page;
