import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType
} from 'graphql';

import validator from 'validator';

import {AppSchema, Platforms} from './appSchema';
import AppModel from './appModel';
import { ErrorSchema } from '../error';

const AppInput = new GraphQLInputObjectType({
    name: 'AppInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        platform: { type: new GraphQLNonNull(Platforms) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const AppMutation = {
    addApp: {
        type: new GraphQLObjectType({
            name: 'addApp',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                app: {type: AppSchema }
            }
        }),
        args: {
            app: {
                type: new GraphQLNonNull(AppInput)
            }
        },
        async resolve(root, args) {

            return newApp.save();

            let errors = [];
            let app = [];

            if (!root.user) {
                errors.push(...[{key: 'user', message: 'Unauthorized access'}]);
            } else {
                args.userId = root.user.id;
                let newApp = new AppModel(args);
                app = await newApp.save();
            }

            return { errors, app }
        }
    },
    deleteApp: {
        type: AppSchema,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root, args) {
            return AppModel.find(args).remove()
        }
    }
}

export default AppMutation;
