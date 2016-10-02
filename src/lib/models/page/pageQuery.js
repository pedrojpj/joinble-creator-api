import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import PageModel from './pageModel';
import PageSchema from './pageSchema';

const PageQuery = {
    pages: {
        type: new GraphQLList(PageSchema),
        resolve(root, args) {
            return PageModel.find();
        }
    }
}

export default PageQuery;
