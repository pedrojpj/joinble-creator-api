import config from '~/src/lib/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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
            expiresIn: 1440
        })
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {
                console.lor(err);
                console.log('token');
                console.lod(decoded);

                if (err) {
                    reject(err);
                }

                resolve(decoded);
            });
        })
    }
}

export default new SecureService();
