import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

import ComponentModel from './componentModel';
import ComponentSchema from './componentSchema';

import { ErrorService } from '~/src/lib/services';

const ComponentQuery = {
    components: {
        type: new GraphQLList(ComponentSchema),
        resolve(root) {
            ErrorService.secure(root);
            return ComponentModel.find();
        }
    }
}

export default ComponentQuery;
