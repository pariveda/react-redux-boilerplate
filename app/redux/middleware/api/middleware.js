import 'isomorphic-fetch';
import { ApiError, RequestError } from './errors';
import * as Utils from './utils';
// const showPersistentErrorToast = (toastOnError: string | boolean): IAddToast => ({
//   payload: {
//     iconType: 'error',
//     title: toastOnError === true ? 'An Error occurred' : (toastOnError as string),
//     duration: Infinity,
//   },
//   type: 'ADD_TOAST',
// });
export const apiTestMiddleware = (api) => (next) => async (action) => {
    if (!Utils.isRSAA(action)) {
        return next(action);
    }
    /** Normalize RSAA action types so we can dispatch them */
    const key = Object.keys(action)[0];
    const rsaaBody = action[key];
    const { types } = rsaaBody;
    const [request, success] = Utils.normalizeTypeDescriptors(types);
    /**
     * Allow __page_tests__ mock store to handle RSAAs. To actually test RSAA action creators,
     * do not use this middleware in your store. Follow the pattern in __tests__/middleware.test.ts.
     */
    next({ type: request.type });
    next({ type: success.type });
};
const apiMiddleware = (api) => (next) => async (action) => {
    // check to make sure this is an RSAA
    if (!Utils.isRSAA(action)) {
        return next(action);
    }
    const key = Object.keys(action)[0];
    const rsaaBody = action[key];
    const { types, method, schema, toastOnError, throwOnError } = rsaaBody;
    const [request, success, failure] = Utils.normalizeTypeDescriptors(types);
    // dispatch request FSA
    next(await Utils.actionWith(request, [rsaaBody]));
    const headers = Utils.buildHeaders(action);
    const url = Utils.buildUrl(action);
    const credentials = Utils.addCredentials(action);
    const reqBody = Utils.buildBody(action);
    let res;
    let exception;
    try {
        // Make the actual API request
        res = await fetch(url, {
            body: reqBody,
            credentials,
            headers,
            method,
        });
    }
    catch (e) {
        // malformed request or network error
        exception = e;
    }
    if (res && res.ok) {
        const successFSA = await Utils.actionWith(success, [
            rsaaBody,
            res,
            schema,
            api.dispatch,
        ]);
        return next(successFSA);
    }
    else {
        if (toastOnError) {
            // api.dispatch(showPersistentErrorToast(toastOnError));
        }
        const requestError = exception ? new RequestError(exception.message) : undefined;
        const failureFSA = await Utils.actionWith({
            ...failure,
            error: true,
        }, [rsaaBody, res, schema, api.dispatch, requestError]);
        if (exception && !(failureFSA.payload instanceof RequestError)) {
            failureFSA.payload = requestError;
        }
        else if (!(failureFSA.payload instanceof ApiError)) {
            failureFSA.payload = new ApiError(res.status, res.statusText, failureFSA.payload);
        }
        const result = next(failureFSA);
        if (throwOnError) {
            throw failureFSA.payload;
        }
        return result;
    }
};
export default apiMiddleware;
//# sourceMappingURL=middleware.js.map