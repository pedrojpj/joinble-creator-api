const {
  GraphQLString: String,
  GraphQLInputObjectType: InputObjectType,
  GraphQLNonNull: NonNull
} = require('graphql');

module.exports = {
  UserInput: new InputObjectType({
    name: 'UserInput',
    fields: {
      name: { type: new NonNull(String) },
      email: { type: new NonNull(String) },
      address: { type: new NonNull(String) },
      city: { type: new NonNull(String) },
      country: { type: new NonNull(String) },
      password: { type: new NonNull(String) }
    }
  }),
  LoginInput: new InputObjectType({
    name: 'LoginInput',
    fields: {
      email: {
        type: String
      },
      password: {
        type: String
      }
    }
  })
};
