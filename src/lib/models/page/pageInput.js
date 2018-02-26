const {
  GraphQLNonNull: NonNull,
  GraphQLString: String,
  GraphQlInt: Int,
  GraphQLInputObjectType: InputObjectType,
  GraphQLBoolean: Boolean,
  GraphQLID: ID,
  GraphQLList: List
} = require('graphql');

const { WidgetInput } = require('../widget');

const PageInput = new InputObjectType({
  name: 'PageInput',
  fields: {
    id: { type: ID },
    name: { type: new NonNull(String) },
    slug: { type: new NonNull(String) },
    app: { type: new NonNull(ID) },
    active: { type: new NonNull(Boolean) },
    widgets: { type: new List(WidgetInput) },
    primary: { type: Boolean }
  }
});

module.exports = PageInput;
