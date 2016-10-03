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

import { AppModel } from '../app';
import { ErrorSchema } from '../error';

const PageMutation = {
    addPage: {
        type: new GraphQLObjectType({
            name: 'AddPage',
            fields: {
                errors: { type: new GraphQLList(ErrorSchema)},
                page: { type: PageSchema }
            }
        }),
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            app: {
                type: new GraphQLNonNull(GraphQLID)
            },
            slug: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args) {

            let page = null;
            let errors = [];
            let app = await AppModel.findOne({id: args.app});

            if (!app) {
                errors.push(...[{key: 'app', message: 'This app does not exist'}]);
            }
            else {
                let newPage = new PageModel(args);
                page = await newPage.save();
            }

            return { errors, page };

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
