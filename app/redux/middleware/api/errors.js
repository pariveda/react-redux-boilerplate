// tslint:disable:max-classes-per-file
/**
 * Error class for a custom `payload` or `meta` function throwing
 */
class InternalError extends Error {
    constructor(message) {
        super();
        this.name = 'InternalError';
        this.message = message;
    }
}
/** Error class for an API response outside of 200 range */
class ApiError extends Error {
    constructor(status, statusText, response) {
        super();
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.message = `${status} - ${statusText}`;
    }
}
/**
 * Error class for an error raised trying to make an API call
 */
class RequestError extends Error {
    constructor(message) {
        super();
        this.name = 'RequestError';
        this.message = message;
    }
}
export { InternalError, ApiError, RequestError };
//# sourceMappingURL=errors.js.map