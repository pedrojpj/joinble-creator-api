import i18n from 'i18n';

class ErrorService {
    constructor() {

    }
    getError(error) {
        this.getErrorMessage(error);
    }
    getErrorMessage(error) {
        switch(error) {
            case 401:
                return i18n.__('UNAUTHORIZED_ACCESS');
            break;
        }

    }
}

export default new ErrorService();
