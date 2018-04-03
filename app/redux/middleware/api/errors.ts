// tslint:disable:max-classes-per-file

/**
 * Error class for a custom `payload` or `meta` function throwing
 */
class InternalError extends Error {
  constructor(message: string) {
    super();
    this.name = 'InternalError';
    this.message = message;
  }
}

/** Error class for an API response outside of 200 range */
class ApiError<T> extends Error {
  /** status code of the response */
  status: number;

  /** status text of the response */
  statusText: string;

  /** parsed JSON response of the API call if Content-Type is JSON */
  response: T;

  constructor(status: number, statusText: string, response: T) {
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
  constructor(message: string) {
    super();
    this.name = 'RequestError';
    this.message = message;
  }
}

export { InternalError, ApiError, RequestError };
