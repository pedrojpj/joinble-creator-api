import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import AppModel from './appModel';
import { AppSchema } from './appSchema';
import { ErrorSchema } from '../error';

const AppQuery = {
    apps: {
        type: new GraphQLObjectType({
            name: 'getApps',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                apps: {type: new GraphQLList(AppSchema)}
            }
        }),
        async resolve(root, args) {

            let errors = [];
            let apps = [];

            if (!root.user) {
                errors.push(...[{key: 'user', message: 'Unauthorized access'}]);
            } else {
                let apps = await AppModel.find({userId: root.user.id});
            }

            return { errors, apps }

        }
    }
}

export default AppQuery;
