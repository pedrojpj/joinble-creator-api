import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} from 'graphql';

import { TranslationSchema } from '../translation';

const Country = new GraphQLObjectType({
    name: 'Country',
    description: 'This represent a Country',
    fields: {
        name: {
            type: GraphQLString
        },
        code: {
            type: GraphQLString,
            resolve(country) {
                return country.alpha2Code
            }
        },
        capital: {
            type: GraphQLString
        },
        region: {
            type: GraphQLString
        },
        population: {
            type: GraphQLInt
        },
        timezones: {
            type: new GraphQLList(GraphQLString)
        },
        languages: {
            type: new GraphQLList(GraphQLString)
        },
        translations: {
            type: TranslationSchema
        }
    }
})

export default Country;
