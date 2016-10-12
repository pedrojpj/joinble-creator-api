import path from 'path';
import config from '~/src/lib/config';

class ImageController {
    constructor() {

    }
    index(req, res) {
        res.sendfile(req.params.image, { root: config.uploadPath})
    }
}

export default new ImageController();
