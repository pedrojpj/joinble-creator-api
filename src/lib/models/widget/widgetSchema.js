const {
  GraphQLObjectType: ObjectType,
  GraphQLInt: Number,
  GraphQLString: String,
  GraphQLNonNull: Null,
  GraphQLList: List,
  GraphQLID: ID,
  GraphQLBoolean: Boolean
} = require('graphql');

const { TranslationSchema } = require('../translation');

const OptionsSchema = new ObjectType({
  name: 'Options',
  description: 'Options of Content',
  fields: {
    formats: {
      type: new List(String)
    },
    maxSize: {
      type: Number
    }
  }
});

const ContentSchema = new ObjectType({
  name: 'Content',
  description: 'This represent a Content of Widget',
  fields: {
    component: {
      type: String
    },
    name: {
      type: String
    },
    label: {
      type: TranslationSchema
    },
    options: {
      type: OptionsSchema
    },
    required: {
      type: Boolean
    },
    value: {
      type: String
    },
    repeat: {
      type: Boolean
    }
  }
});

const WidgetSchema = new ObjectType({
  name: 'Widget',
  description: 'This represent a Widget',
  fields: {
    id: {
      type: new Null(ID)
    },
    name: {
      type: String,
      resolve({ name }, args, request) {
        return name[request.headers['accept-language']];
      }
    },
    selector: {
      type: String
    },
    description: {
      type: String,
      resolve({ description }, args, request) {
        return description[request.headers['accept-language']];
      }
    },
    icon: {
      type: String
    },
    content: {
      type: new List(ContentSchema)
    },
    repeat: {
      type: Boolean
    },
    type: {
      type: String
    }
  }
});

module.exports = WidgetSchema;
