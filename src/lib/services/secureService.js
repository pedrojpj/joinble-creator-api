import config from '~/src/lib/config';
import crypto from 'crypto';

class SecureService {
    constructor() {

    }
    encodePassword(string) {
        return this.md5(string+config.salt);
    }
    md5(string) {
        crypto.createHash('md5').update(string).digest('hex');
    }
}

export default new SecureService();
