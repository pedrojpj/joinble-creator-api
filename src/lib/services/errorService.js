import i18n from 'i18n';
import { UserError } from 'graphql-errors';

class ErrorService {
    constructor() {

    }
    getError(error) {
        return this.getErrorMessage(error);
    }
    getErrorMessage(error) {
        let message;

        switch(error) {
            case 401:
                message = 'UNAUTHORIZED_ACCESS';
            break;
            case 1001:
                message = 'USER_NOT_EXIST';
            break;
            case 1002:
                message = 'APP_NOT_EXIST';
            break;
            default:
                message = 'GENERIC_ERROR';
            break;
        }

        throw new UserError(message);

    }
    secure(root) {
        if (!root.user) {
            this.getError(401);
        }
    }
}

export default new ErrorService();
