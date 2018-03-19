const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const UserModel = require('./userModel');
const UserSchema = require('./userSchema');
const { ErrorService } = require('../../../lib/services');

const UserQuery = {
  getUser: {
    type: new GraphQLObjectType({
      name: 'getUser',
      fields: {
        user: {
          type: UserSchema
        }
      }
    }),
    async resolve(root, args) {
      let user = {};

      ErrorService.secure(root);

      user = await UserModel.findOne({ email: root.user.email })
        .select({ name: 1, email: 1, country: 1, city: 1, address: 1 })
        .exec();

      return { user };
    }
  },
  checkUser: {
    type: new GraphQLObjectType({
      name: 'checkUser',
      fields: {
        status: {
          type: GraphQLBoolean
        },
        user: {
          type: UserSchema
        }
      }
    }),
    resolve(root, args) {
      let status = true;

      if (!root.user) {
        status = false;
      }

      return { status };
    }
  },
  checkRecoverPasswordToken: {
    type: new GraphQLObjectType({
      name: 'checkRevocerPasswordToken',
      fields: {
        status: {
          type: GraphQLBoolean
        }
      }
    }),
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(root, args) {
      let status = false;
      let findUser = await UserModel.findOne({ resetPasswordToken: args.token });

      if (findUser) {
        status = true;
      }

      return {
        status
      };
    }
  }
};

module.exports = UserQuery;
