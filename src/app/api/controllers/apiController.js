import { JsonService } from '~/src/lib/services';

class ApiController {
    constructor() {

    }
    index(req, res) {
        res.json(JsonService.response('Hello Api'))
    }
}

export default new ApiController();
