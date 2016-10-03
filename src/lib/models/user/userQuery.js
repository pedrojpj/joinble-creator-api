import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import UserModel from './userModel';
import UserSchema from './userSchema';
import { SecureService } from '~/src/lib/services';
import { ErrorSchema } from '../error';

const UserQuery = {
    users: {
        type: new GraphQLList(UserSchema),
        resolve(root, args) {
            return UserModel.find();
        }
    },
    login: {
        fields: {
            errors: { type: new GraphQLList(ErrorSchema)},
            user: { type: UserSchema }
        },
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args) {

            let errors = [];
            let user = null;

            args.password = SecureService.encodePassword(args.password);
            user = await UserModel.findOne(args);

            if (!user) {
                errors.push(...[{key: 'user', message: 'This user does not exist'}]);
            }

            return { errors, user }
        }
    }
}

export default UserQuery;
