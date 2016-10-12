import config from '~/src/lib/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import generatePassword from 'password-generator';
import { TokenModel } from '~/src/lib/models/token';

class SecureService {
    constructor() {
    }
    md5(string) {
        return crypto.createHash('md5').update(string).digest('hex');
    }
    encodePassword(string) {
        return this.md5(string+config.salt);
    }
    getToken(user) {
        return jwt.sign(user, config.secret, {
            expiresIn: 50000
        })
    }
    verifyToken(token, id) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {

                if (err) {

                    if (err.name === 'TokenExpiredError') {
                        TokenModel.findOne({id: id}).remove();
                    }

                    reject(null);
                }

                resolve(decoded);
            });
        })
    }
    generatePassword() {
        let newPassword = generatePassword(12, false);
        return newPassword;
    }
}

export default new SecureService();
