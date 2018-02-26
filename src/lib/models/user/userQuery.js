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
  checkUser: {
    type: new GraphQLObjectType({
      name: 'checkUser',
      fields: {
        status: {
          type: GraphQLBoolean
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
