const fs = require('fs');
const uuid = require('node-uuid');
const path = require('path');
const sharp = require('sharp');

class UploadService {
  constructor() {
    this.uploadDir = './uploads';
  }

  upload(image) {
    return new Promise((resolve, reject) => {
      const base64Data = image.replace(/^data:image\/png;base64,/, '').replace(/^data:image\/jpeg;base64,/, '')

      const token = uuid.v4();
      const nameFile = token + '.png';

      sharp(new Buffer(base64Data, 'base64'))
        .resize(320, 240)
        .crop(sharp.gravity.centre)
        .toFile(path.join(this.uploadDir, nameFile), (err, info) => {
          if (!err) {
            resolve({ token: token, image: nameFile });
          } else {
            reject(err);
          }
        });
    });
  }
}

module.exports = new UploadService();
