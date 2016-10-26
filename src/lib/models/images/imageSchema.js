import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';


import config from '~/src/lib/config';

const Image = new GraphQLObjectType({
    name: 'Image',
    description: 'This represent a Image',
    fields: {
        name: {
            type:  GraphQLString,
            resolve(image) {
                return image;
            }
        }
        url: {
            type:  GraphQLString,
            resolve(image) {
                return config.apps.api.imageurl + image;
            }
        }
    }
})

export default Image;
