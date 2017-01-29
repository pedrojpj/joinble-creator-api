import express from 'express';
import { ApiController, UploadController, ImageController } from './controllers';
import graphqlHTPP from 'express-graphql';
import graphql from 'graphql';
import Schema from '~/src/lib/models';
import passport from 'passport';

const maskErrors = require('graphql-errors').maskErrors;

export default function(app){

    const v1 = express.Router();

    v1.get('/', ApiController.index);

    app.use('/v1', v1);
    app.use('/', v1);

    maskErrors(Schema);

    app.use('/graphql', graphqlHTPP(req => ({
        schema: Schema,
        ssrMode: false,
        rootValue: { user: req.user },
        graphiql: true
    })))

    app.post('/upload', UploadController.upload);
    app.use('/images/:image', ImageController.index);

}
