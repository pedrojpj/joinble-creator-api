import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import AppModel from './appModel';
import AppSchema from './appSchema';

const AppQuery = {
    apps: {
        type: new GraphQLList(AppSchema),
        resolve(root, args) {
            return AppModel.find();
        }
    }
}

export default AppQuery;
