const { PageQuery, PageMutation } = require('./page');
const { AppQuery, AppMutation } = require('./app');
const { UserQuery, UserMutation } = require('./user');
const { CountryQuery } = require('./country');
const { TranslationQuery } = require('./translation');
const { WidgetQuery } = require('./widget');
const { ElementQuery } = require('./element');
const { PlatformQuery } = require('./platform');

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
    ...PlatformQuery,
    countries: CountryQuery.countries,
    languages: TranslationQuery.translations,
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
    ...UserMutation
  })
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

module.exports = Schema;
