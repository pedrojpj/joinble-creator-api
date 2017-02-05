import { 
    GraphQLObjectType as ObjectType, 
    GraphQLString as String, 
    GraphQLNonNull as Null, 
    GraphQLID as ID, 
    GraphQLList as List 
} from 'graphql'

export const ElementSchema = new ObjectType({
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
})

export default ElementSchema;
