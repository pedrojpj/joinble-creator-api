import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLBoolean
} from 'graphql';

import validator from 'validator';
import mongoose from 'mongoose';
import { ErrorService } from '~/src/lib/services';

import PageSchema from './pageSchema';
import PageInput from './pageInput';
import PageModel from './pageModel';
import { AppModel } from '../app';

const PageMutation = {
    addPage: {
        type: PageSchema,
        args: {
            page: {
                type: PageInput
            }
        },
        async resolve(root, args) {

            ErrorService.secure(root);

            let app = await AppModel.findOne({id: args.app});

            if (!app) {
                ErrorService.getError(1002);
            }
            else {
                args.page.id = mongoose.Types.ObjectId(args.page.id);

                let page = await PageModel.findOne({_id: args.page.id});

                if (page) {
                    return await PageModel.findOneAndUpdate({_id: args.page.id}, {$set: args.page});
                } else {
                    let newPage = new PageModel(args.page);
                    return await newPage.save();
                }
            }

        }
    },
    deletePage: {
        type: new GraphQLObjectType({
            name: 'deletePage',
            fields: {
                status: { type: GraphQLBoolean }
            }
        }),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(root, args) {

            let status = true;

            ErrorService.secure(root);

            args._id = mongoose.Types.ObjectId(args.id);
            let deletePage = await PageModel.find({_id: args._id}).remove();

            if (!deletePage) {
                status = false;
            }

            return { status };
        }
    }
}

export default PageMutation;
