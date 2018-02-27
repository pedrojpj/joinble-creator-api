const { PageQuery, PageMutation } = require('./page');
const { AppQuery, AppMutation } = require('./app');
const { UserQuery, UserMutation } = require('./user');
const { CountryQuery } = require('./country');
const { TranslationQuery } = require('./translation');
const { WidgetQuery } = require('./widget');
const { ElementQuery } = require('./element');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    pages: PageQuery.pages,
    page: PageQuery.page,
    apps: AppQuery.apps,
    app: AppQuery.app,
    ...UserQuery,
    countries: CountryQuery.countries,
    translations: TranslationQuery.translations,
    elements: ElementQuery.elements,
    widgets: WidgetQuery.widgets
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

module.exports = Schema;
