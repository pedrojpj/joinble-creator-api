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

const UserQuery = {
  users: {
    type: new GraphQLList(UserSchema),
    resolve(root, args) {
      return UserModel.find();
    }
  },
  getUser: {
    type: new GraphQLObjectType({
      name: 'getUser',
      fields: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      }
    }),
    resolve(root, args) {
      return {
        name: root.user ? root.user.name : null,
        email: root.user ? root.user.email : null
      };
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
