import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import UserModel from './userModel';
import UserSchema from './userSchema';

const UserQuery = {
    users: {
        type: new GraphQLList(UserSchema),
        resolve(root, args) {
            return UserModel.find();
        }
    }
}

export default UserQuery;
