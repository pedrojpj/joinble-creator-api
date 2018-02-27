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
        name: root.user.name,
        email: root.user.email
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
  }
};

module.exports = UserQuery;
