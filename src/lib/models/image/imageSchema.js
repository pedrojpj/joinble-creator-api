const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString: String,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const config = require('../../../lib/config');

const Image = new GraphQLObjectType({
  name: 'Image',
  description: 'This represent a Image',
  fields: {
    name: {
      type: String,
      resolve(args) {
        return args.image;
      }
    },
    image: {
      type: String,
      resolve(args) {
        return config.apps.api.imageurl + args.image;
      }
    },
    id: {
      type: String
    }
  }
});

module.exports = Image;
