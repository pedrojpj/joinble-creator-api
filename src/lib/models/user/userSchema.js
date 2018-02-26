const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represent a User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    }
  }
});

module.exports = User;
