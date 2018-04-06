import { normalize, schema as s } from 'normalizr';
import * as actionTypes from './constants';
import { ApiError, InternalError } from './errors';
/**
 * Extract JSON from a server Response object.
 * Returns undefined if no valid JSON in reponse
 */
const getJSON = async (res) => {
    const contentType = res.headers.get('Content-Type');
    const emptyCodes = [204, 205];
    // http://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript
    // tslint:disable no-bitwise
    if (!~emptyCodes.indexOf(res.status) &&
        contentType &&
        ~contentType.indexOf('json')) {
        return res.json();
    }
    else if (contentType && ~contentType.indexOf('pdf')) {
        return res.blob();
    }
    else {
        return Promise.resolve();
    }
};
/**
 * Ensures that types are converted to type descriptors (of type TypeDescriptor).
 * Types is a 3 value array with one value for each of request, success, failure.
 */
const normalizeTypeDescriptors = (types) => {
    const [requestType, successType, failureType] = types;
    let request = requestType;
    let success = successType;
    let failure = failureType;
    if (typeof requestType === 'string') {
        request = { type: requestType };
    }
    request = {
        payload: (action, res, data) => data,
        ...request,
    };
    if (typeof successType === 'string') {
        success = { type: successType };
    }
    success = {
        payload: (action, res, data) => data,
        ...success,
    };
    if (typeof failureType === 'string') {
        failure = { type: failureType };
    }
    failure = {
        payload: (action, res, data) => new ApiError(res.status, res.statusText, data),
        ...failure,
    };
    return [request, success, failure];
};
/**
 * Helpers for determining type of action
 */
const isObject = (obj) => obj instanceof Object && !(obj instanceof Array);
const isAPI = (action) => action.hasOwnProperty(actionTypes.API_CALL);
const isBW = (action) => action.hasOwnProperty(actionTypes.BW_API_CALL);
const isBatch = (action) => action.hasOwnProperty(actionTypes.BATCH_API_CALL);
const isBWBatch = (action) => action.hasOwnProperty(actionTypes.BW_BATCH_API_CALL);
const isRSAA = (action) => isObject(action) &&
    (isAPI(action) || isBW(action) || isBatch(action) || isBWBatch(action));
/**
 * Builds valid URL for a request. Handles both Hybris and BW Urls.
 */
const buildUrl = (action) => {
    const key = Object.keys(action)[0];
    const actionBody = action[key];
    // // replace username constant with username from state.
    // const usernameRegEx = RegExp(actionTypes.USERNAME, 'g');
    // const parsedUrl = actionBody.endpoint.replace(usernameRegEx, session.username);
    // if (isAPI(action) || isBatch(action)) {
    //   return `${session.env && session.env.url}${parsedUrl}`;
    // }
    // const baseUrl =
    //   typeof window !== 'undefined' && window.location.origin !== 'null'
    //     ? window.location.origin
    //     : session.bwInstance.url;
    // return `${baseUrl}${parsedUrl}`;
    return actionBody.endpoint;
};
/**
 * Builds a headers object for a request. Our API normally sends JSON so we default to JSON
 * Content-Type. Handles both Hybris and BW API default headers.
 */
const buildHeaders = (action) => {
    const key = Object.keys(action)[0];
    const actionBody = action[key];
    const { headers } = actionBody;
    const mergedHeaders = { ...headers };
    mergedHeaders['Content-Type'] = 'application/json';
    return mergedHeaders;
    // let mergedHeaders: any = { ...headers };
    // if (
    //   mergedHeaders['Content-Type'] &&
    //   mergedHeaders['Content-Type'] === 'multipart/form-data'
    // ) {
    //   // When using Content-Type: 'multipart/form-data', this content type must be set by the browser;
    //   // setting it manually leaves the 'boundary' field undefined and causes the call to fail.
    //   // Removing 'Content-Type' field entirely in case of 'multipart/form-data',
    //   // otherwise setting it to 'application/json'.
    //   const { 'Content-Type': contentType, ...newHeaders } = mergedHeaders;
    //   mergedHeaders = newHeaders;
    // } else if ((body && !mergedHeaders['Content-Type']) || isBWBatch(action)) {
    //   mergedHeaders['Content-Type'] = 'application/json';
    // }
    // if (isAPI(action) || isBatch(action)) {
    //   if (actionBody.endpoint.indexOf('history') >= 0) {
    //     mergedHeaders.MYSAPSSO2 = session.MYSAPSSO2;
    //   }
    //   mergedHeaders.Authorization = `Bearer ${session.token}`;
    // } else {
    //   mergedHeaders.bwInstanceUrl = session.bwInstance.url;
    //   mergedHeaders.MYSAPSSO2 = session.MYSAPSSO2;
    //   if (!mergedHeaders['x-csrf-token']) {
    //     mergedHeaders['x-csrf-token'] = session.bwToken;
    //   }
    // }
    // return mergedHeaders;
};
const buildBody = (action) => {
    const key = Object.keys(action)[0];
    const actionBody = action[key];
    const { body } = actionBody;
    const isMultipartFormData = actionBody.headers &&
        actionBody.headers['Content-Type'] &&
        actionBody.headers['Content-Type'] === 'multipart/form-data';
    if (typeof body === 'object' && !isMultipartFormData) {
        return JSON.stringify(body);
    }
    else if (isMultipartFormData) {
        const formData = new FormData();
        Object.keys(body).map(k => formData.append(k, body[k]));
        return formData;
    }
};
const addCredentials = (action) => {
    if (isAPI(action) || isBatch(action)) {
        return 'omit';
    }
    else if (isBW(action) || isBWBatch(action)) {
        return 'same-origin';
    }
};
/**
 * Handle normalization for batch and non-batch JSON response. See
 * http://confluence.corp.absc.local/display/HSR/Hybris+Response+DTO+Conventions.
 */
const normalizeResponseData = (json, schema) => {
    if (json.errors && json.data) {
        return {
            data: normalize(json.data, new s.Array(schema)),
            errors: json.errors,
        };
    }
    return normalize(json, schema);
};
/**
 * Converts a TypeDescriptor to an FSA
 * The args array contains at least one value.
 * These args values match the params of the payload function of a TypeDescriptor:
 *  - action body
 *  - resonse object
 *  - normalizr schema
 *  - dispatch method
 * Passed as an array for ease of calling the TypeDescriptor payload fn. Can be an empty array.
 */
const actionWith = async (descriptor, args) => {
    const fsa = { ...descriptor };
    const [action, res, schema, dispatch, requestError] = args;
    try {
        if (typeof descriptor.payload === 'function') {
            let json;
            json = res && (await getJSON(res));
            const data = schema && !descriptor.error && normalizeResponseData(json, schema);
            if (json && json.meta) {
                fsa.meta = {
                    ...fsa.meta,
                    ...json.meta,
                };
            }
            fsa.payload = await descriptor.payload(action, res, requestError || data || json, dispatch);
        }
    }
    catch (e) {
        fsa.payload = new InternalError(e.message);
        fsa.error = true;
    }
    return fsa;
};
export { getJSON, normalizeTypeDescriptors, actionWith, isBW, isBWBatch, isRSAA, buildHeaders, buildUrl, buildBody, addCredentials, };
//# sourceMappingURL=utils.js.map