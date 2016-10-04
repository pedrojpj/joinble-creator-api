import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
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
import { TokenSchema, TokenModel } from '../token';

const UserMutation = {
    login: {
        type: new GraphQLObjectType({
            name: 'Login',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                user: { type: UserSchema },
                token: { type: TokenSchema }
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
            await TokenModel.find({userId: user._id}).remove();
            let newToken = new TokenModel({ userId: user._id, token: token, lastLogin: new Date() });
            token = await newToken.save();

            return { errors, user, token }
        }
    },
    logout: {
        type: new GraphQLObjectType({
            name: 'logout',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                status: { type: GraphQLBoolean }
            }
        }),
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args) {

            let errors = [];
            let status;

            if (!root.user) {
                errors.push(...[{key: 'user', message: 'Unauthorized access'}]);
                status = false;
            } else {
                await TokenModel.find({token: args.token}).remove();
                status = true;
            }

            return { errors, status };

        }
    }
}

export default UserMutation;
