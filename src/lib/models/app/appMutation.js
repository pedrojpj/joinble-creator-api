import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLBoolean
} from 'graphql';

import validator from 'validator';
import mongoose from 'mongoose';

import {AppSchema, Platforms} from './appSchema';
import AppModel from './appModel';
import { ErrorSchema } from '../error';
import { ErrorService } from '~/src/lib/services';


const AppInput = new GraphQLInputObjectType({
    name: 'AppInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        platform: { type: new GraphQLNonNull(new GraphQLList(Platforms)) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const AppMutation = {
    addApp: {
        type: AppSchema,
        args: {
            app: {
                type: new GraphQLNonNull(AppInput)
            }
        },
        async resolve(root, args) {

            ErrorService.secure(root);

            // Add New Application
            args.app.user = mongoose.Types.ObjectId(root.user.id);
            let newApp = new AppModel(args.app);
            return await newApp.save();
        }
    },
    deleteApp: {
        type: new GraphQLObjectType({
            name: 'deleteApp',
            fields: {
                status: { type: GraphQLBoolean }
            }
        }),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(root, args) {

            let status = true;

            ErrorService.secure(root);

            args.user =  mongoose.Types.ObjectId(root.user.id);
            args._id = mongoose.Types.ObjectId(args.id);
            let deleteUser = await AppModel.find({user: args.user, _id: args._id}).remove();

            if (!deleteUser) {
                status = false;
            }

            return { status };
        }
    }
}

export default AppMutation;
