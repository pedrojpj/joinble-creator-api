const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLNonNull: NonNull,
  GraphQLID: ID
} = require('graphql');

const PlatformsSchema = new ObjectType({
  name: 'Platform',
  description: 'This represent a platform',
  fields: () => {
    return {
      id: {
        type: new NonNull(ID)
      },
      name: {
        type: String
      },
      code: {
        type: String
      }
    };
  }
});

module.exports = {
  PlatformsSchema
};
