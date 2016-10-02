class JsonService {
    constructor() {

    }
    errorResponse(code, data) {
        return {
    		status: false,
    		message: {
    			code: code,
    			message: data
    		}
    	}
    }
    response(data) {
        return {
    		status: true,
    		data: data
    	}
    }
    errorType(error, errorMessage) {

    	let errorObject = {};

    	switch (error) {
    		case 401:
    			errorObject.status = 401;
    			errorObject.message = 'User or password incorrect';
    			break;
    		case 403:
    			errorObject.status = 403;
    			errorObject.message = 'Forbidden';
    			break;
    		case 404:
    			errorObject.status = 404;
    			errorObject.message = 'Data not found';
    			break;
    		case 10001:
    			errorObject.status = 400;
    			errorObject.message = 'Coupon not delivered';
    			break;
    		case 10002:
    			errorObject.status = 400;
    			errorObject.message = 'Coupon has already been redeemed';
    			break;
    		case 10003:
    			errorObject.status = 400;
    			errorObject.message = 'Campaign has expired';
    			break;
    		case 10004:
    			errorObject.status = 400;
    			errorObject.message = 'Campaign is not available';
    			break;
    		case 10005:
    			errorObject.status = 400;
    			errorObject.message = 'Error while creating the campaign';
    			break;
    		case 10006:
    			errorObject.status = 400;
    			errorObject.message = 'Error while inserting the coupons';
    			break;
    		case 10007:
    			errorObject.status = 400;
    			errorObject.message = 'Error while removing the campaign';
    			break;
    		case 10008:
    			errorObject.status = 400;
    			errorObject.message = 'You can not change the availability of a campaign without coupons';
    			break;
    		case 10010:
    			errorObject.status = 400;
    			errorObject.message = 'Error while availability updating campaign';
    			break;
    		case 10004:
    			errorObject.status = 400;
    			errorObject.message = 'Campaign is not available';
    			break;
    		case 11000:
    			errorObject.status = 400;
    			errorObject.message = 'Error duplicate field';
    			break;
    		default:
    			errorObject.status = 400;
    			errorObject.message = 'Generic error';
    			break;
    	}

    	errorObject.code = error;

    	if (errorMessage) {
    		errorObject.message = errorMessage;
    	}

    	return errorObject;
    }
}

export default new JsonService();
