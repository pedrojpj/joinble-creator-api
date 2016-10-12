import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';
import Config from '../config';

class EmailService {
    constructor() {
        this.transport = nodemailer.createTransport(sesTransport({
            accessKeyId: Config.amazon.accessKey,
            secretAccessKey: Config.amazon.secretKey,
            rateLimit: 5,
            region: Config.amazon.region
        }));
    }
    sendPassword(email, newPassword) {
        return new Promise((resolve, reject) => {
            this.transport.sendMail({
                from: Config.email,
                to: email,
                html: `
                    <p>The new password is ${newPassword}<b></p>
                `
            }, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }

            })

        })

    }
}

export default new EmailService();
