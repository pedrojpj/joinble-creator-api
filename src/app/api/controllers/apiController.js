const { JsonService } = require('../../../lib/services');

class ApiController {
  constructor() {}
  index(req, res) {
    res.json(JsonService.response('Hello Api'));
  }
}

module.exports = new ApiController();
