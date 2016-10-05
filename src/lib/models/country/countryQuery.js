import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import CountrySchema from './countrySchema';
import { ApiService } from '~/src/lib/services';

const CountryQuery = {
    countries: {
        type: new GraphQLList(CountrySchema),
        resolve(root, args) {
            return ApiService.request('https://restcountries.eu/rest/v1/all')
        }
    }
}

export default CountryQuery;
