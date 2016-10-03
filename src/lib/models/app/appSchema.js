import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

const App = new GraphQLObjectType({
    name: 'App',
    description: 'This represent a App',
    fields: () => {
        return {
            _id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            code: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            }
        }
    }
})

export default App;
