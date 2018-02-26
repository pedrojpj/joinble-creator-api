const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const CountrySchema = require('./countrySchema');
const { ApiService } = require('../../../lib/services');

const CountryQuery = {
  countries: {
    type: new GraphQLList(CountrySchema),
    args: {
      language: { type: GraphQLString }
    },
    resolve(root, args) {
      return ApiService.request('https://restcountries.eu/rest/v1/all');
    }
  }
};

module.exports = CountryQuery;
