import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import AppModel from './appModel';
import { AppSchema } from './appSchema';
import { ErrorService } from '~/src/lib/services';

const AppQuery = {
    apps: {
        type: new GraphQLList(AppSchema),
        async resolve(root, args) {
            ErrorService.secure(root);
            return await AppModel.find({user: root.user._id});
        }
    },
    app: {
        type: AppSchema,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID)}
        },
        async resolve(root, args) {
            ErrorService.secure(root);
            return await AppModel.findOne({user: root.user._id, _id: args.id});
        }
    }
}

export default AppQuery;
