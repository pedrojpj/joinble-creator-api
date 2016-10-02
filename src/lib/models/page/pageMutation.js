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

import PageSchema from './pageSchema';
import PageModel from './pageModel';

const PageMutation = {
    addPage: {
        type: PageSchema,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            slug: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(root, args) {
            let newPage = new PageModel(args);

            return newPage.save();
        }
    },
    deletePage: {
        type: PageSchema,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root, args) {
            return PageModel.find(args).remove()
        }
    }
}

export default PageMutation;
