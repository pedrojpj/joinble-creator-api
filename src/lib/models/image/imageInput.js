const {
  GraphQLString: String,
  GraphQLBoolean: Boolean,
  GraphQLInputObjectType: InputObjectType,
  GraphQLNonNull: NonNull
} = require('graphql');

module.exports = {
  ImageInput: new InputObjectType({
    name: 'ImageInput',
    fields: {
      image: { type: new NonNull(String) },
      id: { type: new NonNull(String) }
    }
  })
};
