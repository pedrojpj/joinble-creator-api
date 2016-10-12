import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

import PageModel from './pageModel';
import PageSchema from './pageSchema';

import { ErrorService } from '~/src/lib/services';

const PageQuery = {
    pages: {
        type: new GraphQLList(PageSchema),
        args: {
            app: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root, args) {
            ErrorService.secure(root);
            return PageModel.find(args);
        }
    }
}

export default PageQuery;
