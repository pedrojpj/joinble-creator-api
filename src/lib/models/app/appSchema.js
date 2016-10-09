import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLEnumType
} from 'graphql';

export const Platforms = new GraphQLEnumType({
    name: 'platforms',
    description: 'This represent a platform',
    values: {
        WEB: {
            value: 'web'
        },
        ANDROID: {
            value: 'android'
        },
        IOS: {
            value: 'ios'
        }
    }
})

export const AppSchema = new GraphQLObjectType({
    name: 'App',
    description: 'This represent a App',
    fields: () => {
        return {
            _id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            user: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            code: {
                type: GraphQLString
            },
            platform: {
                type: Platforms
            },
            domain: {
                type: GraphQLString
            },
            icon: {
                type: GraphQLString
            },
            updateAt: {
                type: GraphQLString
            },
            createdAt: {
                type: GraphQLString
            }
        }
    }
})
