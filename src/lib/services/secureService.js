import config from '~/src/lib/config';
import crypto from 'crypto';

class SecureService {
    constructor() {
    }
    md5(string) {
        return crypto.createHash('md5').update(string).digest('hex');
    }
    encodePassword(string) {
        return this.md5(string+config.salt);
    }
}

export default new SecureService();
