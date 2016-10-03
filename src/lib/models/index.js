import { PageQuery, PageMutation } from './page';
import { AppQuery, AppMutation } from './app';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        pages: PageQuery.pages,
        apps: AppQuery.apps
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPage: PageMutation.addPage,
        deletePage: PageMutation.deletePage,
        addApp: AppMutation.addApp,
        deleteApp: AppMutation.deleteApp,
        error: { type: new GraphQLNonNull(GraphQLString)}
    })
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default Schema;
