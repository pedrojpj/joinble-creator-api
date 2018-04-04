const multer = require('multer');
const uuid = require('node-uuid');
const path = require('path');

const { JsonService } = require('../../../lib/services');
const { ImageModel } = require('../../../lib/models/image');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('file');

class UploadControler {
  constructor() {}
  upload(req, res) {
    upload(req, res, function(err) {
      const file = req.file;

      if (err) {
        return res.json(JsonService.errorResponse(500, 'Error Generic'));
      }

      res.json(JsonService.response({ file: file.filename }));
    });
  }
}

module.exports = new UploadControler();
