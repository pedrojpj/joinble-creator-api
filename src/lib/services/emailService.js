const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const Config = require('../config');

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport(
      sesTransport({
        accessKeyId: Config.amazon.accessKey,
        secretAccessKey: Config.amazon.secretKey,
        rateLimit: 5,
        region: Config.amazon.region
      })
    );
  }
  sendPassword(email, newPassword) {
    return new Promise((resolve, reject) => {
      this.transport.sendMail(
        {
          from: Config.email,
          to: email,
          html: `
                    <p>The new password is ${newPassword}<b></p>
                `
        },
        (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        }
      );
    });
  }
}

module.exports = new EmailService();
