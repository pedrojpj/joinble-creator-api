import { PageQuery, PageMutation } from './page';
import { AppQuery, AppMutation } from './app';
import { UserQuery, UserMutation } from './user';
import { CountryQuery } from './country';

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
        apps: AppQuery.apps,
        users: UserQuery.users,
        countries: CountryQuery.countries
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPage: PageMutation.addPage,
        deletePage: PageMutation.deletePage,
        addApp: AppMutation.addApp,
        deleteApp: AppMutation.deleteApp,
        login: UserMutation.login,
        logout: UserMutation.logout
    })
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default Schema;
