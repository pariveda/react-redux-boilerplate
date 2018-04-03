import { Schema } from 'normalizr';
import FSA from 'types/fsa';
import { Dispatch } from 'types/redux';

// tslint:disable interface-name

/**
 * A TypeDescriptor is a plain object that will be used as a blueprint
 * to create dispatched FSAs. TypeDescriptors must have a type property, intended
 * to contain the string constant specifying the type of the resulting FSAs.
 *
 * More info on TypeDescriptors can be found on Confluence:
 * http://confluence.corp.absc.local/display/HSR/API+Middleware#APIMiddleware-TypeDescriptors
 */
export interface TypeDescriptor extends FSA {
  /**
   * Function that takes the action and possible reponse and returns an object that
   * represents the actual FSA payload.
   *
   * For success type TypeDescriptors, the json data will be provided by the data param.
   *
   * Can also be a plain object.
   */
  payload?:
    | ((
        action: Batch | NoBatch,
        res?: Response,
        data?: any,
        dispatch?: Dispatch,
      ) => any)
    | Error;
}

/**
 * Redux Standard API-calling Actions
 * https://github.com/agraboso/redux-api-middleware/tree/next#redux-standard-api-calling-actions
 */
interface RSAA {
  /** Object with single key: either API_CALL or BW_API_CALL */
  [key: string]: NoBatch;
}

export interface NoBatch extends RSAABody {
  /** TypeDescriptor or a string `type` key, three entries: request, success, failure */
  types: [TypeDescriptor | string, TypeDescriptor | string, TypeDescriptor | string];
}

export interface BatchRSAA {
  [key: string]: Batch;
}

export interface Batch extends RSAABody {
  /** Batch types field takes only two values since response is always 200 OK (no HTTP failure) */
  types: [TypeDescriptor | string, TypeDescriptor | string, TypeDescriptor | string];
}

export interface BWBatchRSAA {
  [key: string]: BWBatch;
}

export interface BWBatch extends RSAABody {
  /**
   * query response key with endpoints within the same bw service
   * i.e: { TopProducts: '/TopProducts?top=20', TopTherapeutics: '/TopTherapeutics' }
   */
  odataQueries: ODataQuery[];
  /** BW Batch types field takes three entries: request, success, failure */
  types: [TypeDescriptor | string, TypeDescriptor | string, TypeDescriptor | string];
}
export interface ODataQuery {
  key: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: object;
}

/** RSAA objects contain only 1 top level property */

export type HTTPMethods =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';
export interface RSAABody {
  /**
   * Should match one of the following according to the fetch spec:
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
   * Notes:
   *  * Fetch spec specifies USVString, meaning a unicode string. That's
   *      equivalent to a regular string in the type system, so used
   *      string directly instead for clarity.
   *  * For ease of use, also allowing passing in an object.
   *      Objects will be run through JSON.stringify in the middleware.
   */
  body?: object | FormData | string | null;

  /** Path of API endpoint. Do not include domain. */
  endpoint: string;

  /** Object containing valid HTTP headers */
  headers?: { [key: string]: string };

  /** Standard HTTP actions */
  method: HTTPMethods;

  /**
   * Normalizr schema to normalize successful response data.
   * See more information at https://github.com/paularmstrong/normalizr
   */
  schema?: Schema;

  /**
   * Whether to display an error message in a toast if the request fails.
   * If a string is specified, that string will be used as the error message.
   * If true, a generic error message will be used instead.
   */
  toastOnError?: string | boolean;

  /**
   * Whether to throw an exception if the request fails.
   */
  throwOnError?: boolean;
}

export default RSAA;
