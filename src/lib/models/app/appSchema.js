import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
    GraphQLEnumType
} from 'graphql';

import config from '~/src/lib/config';

export const Platforms = new GraphQLEnumType({
    name: 'platforms',
    description: 'This represent a platform',
    values: {
        web: {
            value: 'web'
        },
        android: {
            value: 'android'
        },
        ios: {
            value: 'ios'
        }
    }
})

export const AppSchema = new GraphQLObjectType({
    name: 'App',
    description: 'This represent a App',
    fields: () => {
        return {
            id: {
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
                type: new GraphQLList(Platforms)
            },
            domain: {
                type: GraphQLString
            },
            icon: {
                type: GraphQLString,
                resolve(app) {
                    return config.apps.api.imageurl + app.icon;
                }
            },
            languages: {
                type: new GraphQLList(GraphQLString)
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
