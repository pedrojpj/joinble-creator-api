import express from 'express';
import { ApiController } from './controllers';
import graphqlHTPP from 'express-graphql';
import graphql from 'graphql';
import Schema from '~/src/lib/models';
import passport from 'passport';

export default function(app){

    const v1 = express.Router();

    v1.get('/', passport.authenticate('jwt'), ApiController.index);

    app.use('/v1', v1);
    app.use('/', v1);

    app.use('/graphql', graphqlHTPP(req => ({
        schema: Schema,
        rootValue: { user: req.user },
        graphiql: true
    })))

}
