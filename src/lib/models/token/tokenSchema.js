const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const moment = require('moment');

const Token = new GraphQLObjectType({
  name: 'Token',
  description: 'This represent a Token',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    token: {
      type: GraphQLString
    },
    lastLogin: {
      type: GraphQLString,
      resolve(token) {
        return moment(token.lastLogin).format();
      }
    }
  }
});

module.exports = Token;
