const fs = require('fs');
const uuid = require('node-uuid');
const path = require('path');
const sharp = require('sharp');
const Promise = require('bluebird');

class UploadService {
  constructor() {
    this.uploadDir = './uploads';
  }

  upload(image, crops) {
    return new Promise((resolve, reject) => {
      const base64Data = image
        .replace(/^data:image\/png;base64,/, '')
        .replace(/^data:image\/jpeg;base64,/, '');

      const token = uuid.v4();
      const nameFile = token;
      const extension = '.png';

      const promises = [];

      promises.push(
        sharp(new Buffer(base64Data, 'base64'))
          .resize(320, 320)
          .crop(sharp.gravity.centre)
          .toFile(path.join(this.uploadDir, nameFile + extension))
      );

      if (crops) {
        crops.map(crop =>
          promises.push(
            sharp(new Buffer(base64Data, 'base64'))
              .resize(crop.width, crop.height)
              .toFile(
                path.join(
                  this.uploadDir,
                  nameFile + '_' + crop.width + 'x' + crop.height + extension
                )
              )
          )
        );
      }

      Promise.all(promises)
        .then(() => {
          resolve({ token: token, image: nameFile + extension });
        })
        .catch(error => reject(err));
    });
  }
}

module.exports = new UploadService();
