const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLNonNull: NonNull,
  GraphQLID: Id
} = require('graphql');

const { ImageSchema, ImageModel } = require('../image');

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
    },
    avatar: {
      type: ImageSchema,
      async resolve(args) {
        let image;

        if (args.avatar) {
          image = await ImageModel.findOne({ _id: args.avatar });
        }
        return image;
      }
    }
  }
});

module.exports = User;
