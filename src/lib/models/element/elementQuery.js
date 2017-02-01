import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql'
import { ErrorService } from '~/src/lib/services'
import ElementModel  from './ElementModel'
import ElementSchema  from './ElementSchema'

const ElementQuery = {
    elements: {
        type: new GraphQLList(ElementSchema),
        resolve(root) {
            ErrorService.secure(root);
            return ElementModel.find();
        }
    }
}

export default ElementQuery;
