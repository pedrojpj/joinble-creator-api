import express from 'express';
import { ApiController } from './controllers';
import graphqlHTPP from 'express-graphql';
import Schema from '~/src/lib/models';

export default function(app){

    const v1 = express.Router();

    v1.get('/', ApiController.index);

    app.use('/v1', v1);
    app.use('/', v1);

    app.use('/graphql', graphqlHTPP({
        schema: Schema,
        rootValue: root,
        graphiql: true
    }))

}
