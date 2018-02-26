const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType
} = require('graphql');

const config = require('../../../lib/config');
const { ImageSchema } = require('../image');

const Platforms = new GraphQLEnumType({
  name: 'platforms',
  description: 'This represent a platform',
  values: {
    web: {
      value: 'web'
    },
    android: {
      value: 'android'
    },
    ios: {
      value: 'ios'
    }
  }
});

const AppSchema = new GraphQLObjectType({
  name: 'App',
  description: 'This represent a App',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      user: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      },
      platform: {
        type: new GraphQLList(Platforms)
      },
      domain: {
        type: GraphQLString
      },
      icon: {
        type: ImageSchema,
        resolve(app) {
          return app.icon;
        }
      },
      languages: {
        type: new GraphQLList(GraphQLString)
      },
      updateAt: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      }
    };
  }
});

module.exports = {
  AppSchema,
  Platforms
};
