const path = require('path');
const config = require('../../../lib/config');

class ImageController {
  constructor() {}
  index(req, res) {
    res.sendfile(req.params.image, { root: config.uploadPath });
  }
}

module.exports = new ImageController();
