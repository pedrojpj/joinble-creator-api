const { GraphQLList: List } = require('graphql');
const { ErrorService } = require('../../../lib/services');
const ElementModel = require('./elementModel');
const ElementSchema = require('./elementSchema');

const ElementQuery = {
  elements: {
    type: new List(ElementSchema),
    resolve(root) {
      ErrorService.secure(root);
      return ElementModel.find();
    }
  }
};

module.exports = ElementQuery;
