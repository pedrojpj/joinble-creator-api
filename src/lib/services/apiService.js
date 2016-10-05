import request from 'request';
import Config from '../config';

class ApiService {
    constructor() {
    }
    request(endpoint, params) {

        this.url = endpoint;

        let options = {
            url: this.url,
            method: this.method,
            json: true
        }

        if (params) {
            options.qs = params;
        }

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                resolve(body);
            })
        })

    }

}

export default new ApiService();
