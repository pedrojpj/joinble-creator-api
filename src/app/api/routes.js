const express = require('express');
const { ApiController, UploadController, ImageController } = require('./controllers');
const graphqlHTPP = require('express-graphql');
const graphql = require('graphql');
const Schema = require('../../lib/models');
const passport = require('passport');

const maskErrors = require('graphql-errors').maskErrors;

module.exports = function(app) {
  const v1 = express.Router();

  v1.get('/', ApiController.index);

  app.use('/v1', v1);
  app.use('/', v1);

  maskErrors(Schema);

  app.use(
    '/graphql',
    graphqlHTPP(req => ({
      schema: Schema,
      ssrMode: false,
      rootValue: { user: req.user },
      graphiql: true
    }))
  );

  app.post('/upload', UploadController.upload);
  app.use('/images/:image', ImageController.index);
};
