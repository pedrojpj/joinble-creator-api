const {
  GraphQLInputObjectType: InputObjectType,
  GraphQLString: String,
  GraphQLNonNull: NonNull,
  GraphQLList: List
} = require('graphql');

module.exports = AppInput = new InputObjectType({
  name: 'AppInput',
  fields: {
    id: { type: String },
    name: { type: new NonNull(String) },
    code: { type: new NonNull(String) },
    platforms: { type: new NonNull(new List(String)) },
    domain: { type: new NonNull(String) },
    icon: { type: String },
    languages: { type: new NonNull(new List(String)) }
  }
});
