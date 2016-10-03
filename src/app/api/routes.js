import express from 'express';
import { ApiController } from './controllers';
import graphqlHTPP from 'express-graphql';
import graphql from 'graphql';
import Schema from '~/src/lib/models';
import passport from './controllers/authController';

export default function(app){

    const v1 = express.Router();

    v1.get('/', ApiController.index);

    v1.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }), (req, res) => {
        res.redirect('/');
    });

    app.use('/v1', v1);
    app.use('/', v1);

    app.use('/graphql', graphqlHTPP(req => ({
        schema: Schema,
        rootValue: { user: req.user },
        graphiql: true
    })))

}
