const {
  GraphQLNonNull: NonNull,
  GraphQLString: String,
  GraphQlInt: Int,
  GraphQLInputObjectType: InputObjectType,
  GraphQLBoolean: Boolean,
  GraphQLID: ID,
  GraphQLList: List
} = require('graphql');

const { TranslationInput } = require('../translation');

const ContentInput = new InputObjectType({
  name: 'ContentInput',
  fields: {
    component: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String
    },
    label: {
      type: TranslationInput
    },
    required: {
      type: Boolean
    },
    repeat: {
      type: Boolean
    }
  }
});

const WidgetInput = new InputObjectType({
  name: 'WidgetInput',
  fields: {
    id: {
      type: new NonNull(String)
    },
    name: {
      type: String
    },
    description: {
      type: TranslationInput
    },
    content: {
      type: new List(ContentInput)
    },
    mode: {
      type: String
    },
    repeat: {
      type: Boolean
    }
  }
});

module.exports = WidgetInput;
