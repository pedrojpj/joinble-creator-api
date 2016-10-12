import i18n from 'i18n';
import { UserError } from 'graphql-errors';

class ErrorService {
    constructor() {

    }
    getError(error) {
        return this.getErrorMessage(error);
    }
    getErrorMessage(error) {
        switch(error) {
            case 401:
                return 'UNAUTHORIZED_ACCESS';
            case 1001:
                return 'USER_NOT_EXIST'
            break;
        }

    }
    secure(root) {
        if (!root.user) {
            throw new UserError(this.getError(401));
        }
    }
}

export default new ErrorService();
