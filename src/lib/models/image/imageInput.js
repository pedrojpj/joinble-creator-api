const {
  GraphQLString: String,
  GraphQLInt: Number,
  GraphQLBoolean: Boolean,
  GraphQLInputObjectType: InputObjectType,
  GraphQLNonNull: NonNull,
  GraphQLList: List
} = require('graphql');

const CropsInput = new InputObjectType({
  name: 'CropsInput',
  fields: {
    width: { type: new NonNull(Number) },
    height: { type: new NonNull(Number) }
  }
});

const ImageInput = new InputObjectType({
  name: 'ImageInput',
  fields: {
    image: { type: new NonNull(String) },
    crops: { type: new List(CropsInput) },
    id: { type: new NonNull(String) }
  }
});

module.exports = {
  CropsInput,
  ImageInput
};
