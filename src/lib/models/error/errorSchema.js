const { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

const ErrorSchema = new GraphQLObjectType({
  name: 'ErrorSchema',
  fields: {
    key: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = ErrorSchema;
