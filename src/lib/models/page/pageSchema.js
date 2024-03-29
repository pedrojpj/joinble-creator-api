const {
  GraphQLObjectType: ObjectType,
  GraphQLInt: Int,
  GraphQLString: String,
  GraphQLNonNull: NonNull,
  GraphQLBoolean: Boolean,
  GraphQLID: ID,
  GraphQLList: List
} = require('graphql');

const { SeoSchema } = require('../seo');

const { WidgetSchema } = require('../widget');

const PageSchema = new ObjectType({
  name: 'Page',
  description: 'This represent a Page',
  fields: {
    id: {
      type: new NonNull(ID)
    },
    name: {
      type: String
    },
    slug: {
      type: String
    },
    app: {
      type: ID
    },
    active: {
      type: Boolean
    },
    primary: {
      type: Boolean
    },
    createdAt: {
      type: String
    },
    updateAt: {
      type: String
    },
    widgets: {
      type: new List(WidgetSchema)
    }
  }
});

module.exports = PageSchema;
