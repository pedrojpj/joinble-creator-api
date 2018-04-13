const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLID
} = require('graphql');

const ImageModel = require('./imageModel');
const { ImageInput } = require('./imageInput');
const ImageSchema = require('./imageSchema');
const { UploadService, ErrorService } = require('../../../lib/services');
const { ErrorSchema } = require('../error');

const ImageMutation = {
  upload: {
    type: new GraphQLObjectType({
      name: 'Upload',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        image: { type: ImageSchema }
      }
    }),
    args: {
      image: {
        type: ImageInput
      }
    },
    async resolve(root, args) {
      let errors = [];
      let image;

      ErrorService.secure(root);

      try {
        const imageUpload = await UploadService.upload(
          args.image.image,
          args.image.crops
        );
        image = await ImageModel.create(imageUpload);
      } catch (error) {
        ErrorService.getError(1003);
      }

      return {
        errors,
        image
      };
    }
  }
};

module.exports = ImageMutation;
