import {
    GraphQLList as List,
    GraphQLBoolean as Boolean
} from 'graphql';

import WidgetModel from './widgetModel';
import WidgetSchema from './widgetSchema';

import { ErrorService } from '~/src/lib/services';

const WidgetQuery = {
    widgets: {
        type: new List(WidgetSchema),
        resolve(root, args) {
            ErrorService.secure(root);
            return WidgetSchema.find();
        }
    }
}

export default WidgetQuery;
