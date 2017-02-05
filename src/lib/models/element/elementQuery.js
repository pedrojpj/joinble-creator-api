import { GraphQLList as List } from 'graphql'
import { ErrorService } from '~/src/lib/services'
import ElementModel  from './elementModel'
import ElementSchema  from './elementSchema'

const ElementQuery = {
    elements: {
        type: new List(ElementSchema),
        resolve(root) {
            ErrorService.secure(root);
            return ElementModel.find();
        }
    }
}

export default ElementQuery;
