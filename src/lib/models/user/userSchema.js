const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLNonNull: NonNull,
  GraphQLID: Id
} = require('graphql');

const User = new ObjectType({
  name: 'User',
  description: 'This represent a User',
  fields: {
    id: {
      type: new NonNull(Id)
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    address: {
      type: String
    }
  }
});

module.exports = User;
