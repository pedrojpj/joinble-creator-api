import { PageQuery, PageMutation } from './page';
import { AppQuery, AppMutation } from './app';
import { UserQuery, UserMutation } from './user';
import { CountryQuery } from './country';
import { TranslationQuery } from './translation';
import { ComponentQuery } from './component';

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
        page: PageQuery.page,
        apps: AppQuery.apps,
        app: AppQuery.app,
        users: UserQuery.users,
        checkUser: UserQuery.checkUser,
        countries: CountryQuery.countries,
        translations: TranslationQuery.translations,
        components: ComponentQuery.components
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
        logout: UserMutation.logout,
        createUser: UserMutation.createUser,
        forgetPassword: UserMutation.forgetPassword
    })
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default Schema;
