import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';

import validator from 'validator';

import AppSchema from './appSchema';
import AppModel from './appModel';

const AppMutation = {
    addApp: {
        type: AppSchema,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            domain: {
                type: GraphQLString
            }
        },
        resolve(root, args) {
            let newApp = new AppModel(args);
            return newApp.save();
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
