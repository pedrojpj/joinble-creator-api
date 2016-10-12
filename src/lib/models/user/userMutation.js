import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLID
} from 'graphql';

import UserModel from './userModel';
import UserSchema from './userSchema';
import { SecureService, ErrorService } from '~/src/lib/services';
import { ErrorSchema } from '../error';
import { TokenSchema, TokenModel } from '../token';

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const UserMutation = {
    login: {
        type: new GraphQLObjectType({
            name: 'Login',
            fields: {
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

            let user = null;
            let token = null;

            args.password = SecureService.encodePassword(args.password);
            user = await UserModel.findOne(args);

            if (!user) {
                throw new UserError(ErrorService.getError(1001));
            }

            token = SecureService.getToken({id : user._id.toString()});
            await TokenModel.find({userId: user._id}).remove();
            let newToken = new TokenModel({ userId: user._id, token: token, lastLogin: new Date() });
            token = await newToken.save();


            return { user, token }
        }
    },
    createUser: {
        type: new GraphQLObjectType({
            name: 'createUser',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                user: { type: UserSchema },
                token: { type: TokenSchema }
            }
        }),
        args: {
            user: {
                type: new GraphQLNonNull(UserInput)
            }
        },
        async resolve(root, args) {

            let errors = [];
            let user;
            let token;

            let checkUser = await UserModel.findOne({email: args.user.email});

            if (checkUser) {
                errors.push(...[{key: 'email', message: 'This email is already registered'}]);
            } else {

                args.user.password = SecureService.encodePassword(args.user.password);

                let newEmail = new UserModel(args.user);
                user = await newEmail.save();
                token = SecureService.getToken({id : user._id.toString()});
                let newToken = new TokenModel({ userId: user._id, token: token, lastLogin: new Date() });
                token = await newToken.save();

            }

            return { errors, token, user };

        }
    },
    forgetPassword: {
        type: new GraphQLObjectType({
            name: 'forgetPassword',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                status: { type: GraphQLBoolean }
            }
        }),
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args) {

            let errors = [];
            let status;

            let user = await UserModel.findOne(args);

            if (!user) {
                errors.push(...[{key: 'user', message: 'This user does not exist'}]);
                status = false;
            } else {
                let newPassword = SecureService.generatePassword();
                let updateUser = await UserModel(args, {password: newPassword});

                if (!updateUser) {
                    errors.push(...[{key: 'user', message: 'Generic error'}]);
                } else {
                    status = true;
                }
            }

            return { errors, token, user };

        }
    },
    logout: {
        type: new GraphQLObjectType({
            name: 'logout',
            fields: {
                status: { type: GraphQLBoolean }
            }
        }),
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args) {

            ErrorService.secure(root);

            let status;

            await TokenModel.find({token: args.token}).remove();
            status = true;

            return { status };

        }
    }
}

export default UserMutation;
