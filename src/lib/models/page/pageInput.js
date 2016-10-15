import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLID
} from 'graphql';

import { SeoInput } from '../seo';

const PageInput = new GraphQLInputObjectType({
    name: 'PageInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
        app: { type: new GraphQLNonNull(GraphQLID) },
        seo: { type: SeoInput }
    }
})

export default PageInput;
