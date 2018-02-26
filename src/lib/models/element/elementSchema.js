const {
  GraphQLObjectType: ObjectType,
  GraphQLString: String,
  GraphQLNonNull: Null,
  GraphQLID: ID,
  GraphQLList: List
} = require('graphql');

module.exports = ElementSchema = new ObjectType({
  name: 'Element',
  description: 'This represent a Element',
  fields: {
    id: {
      type: new Null(ID)
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    type: {
      type: String
    },
    selector: {
      type: String
    },
    childs: {
      type: new List(String)
    },
    updateAt: {
      type: String
    }
  }
});

module.exports = ElementSchema;
