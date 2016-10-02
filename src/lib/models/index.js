import { PageQuery, PageMutation } from './page';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        pages: PageQuery.pages
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPage: PageMutation.addPage,
        deletePage: PageMutation.deletePage
    })
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default Schema;
