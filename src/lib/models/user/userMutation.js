import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';

import UserModel from './userModel';
import UserSchema from './userSchema';
import { SecureService } from '~/src/lib/services';
import { ErrorSchema } from '../error';

const UserMutation = {
    login: {
        type: new GraphQLObjectType({
            name: 'Login',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                user: { type: UserSchema },
                token: { type: GraphQLString }
            }
        }),
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
            let token = null;

            args.password = SecureService.encodePassword(args.password);
            user = await UserModel.findOne(args);

            if (!user) {
                errors.push(...[{key: 'user', message: 'This user does not exist'}]);
            }

            token = SecureService.getToken({id : user._id.toString()});
            return { errors, user, token }
        }
    }
}

export default UserMutation;
