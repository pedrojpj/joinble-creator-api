import { PageQuery, PageMutation } from './page';

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
        pages: PageQuery.pages
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPage: PageMutation.addPage,
        deletePage: PageMutation.deletePage,
        error: { type: new GraphQLNonNull(GraphQLString)}
    })
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default Schema;
