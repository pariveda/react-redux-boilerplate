import 'isomorphic-fetch';
// import { IAddToast } from 'modules/toast/types';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

import FSA from 'types/fsa';
// import IGlobalState from 'types/global-state';
import RSAA, { Batch, BatchRSAA, BWBatch, NoBatch } from 'types/rsaa';
import { ApiError, RequestError } from './errors';
import * as Utils from './utils';

// Extend the Dispatch type to allow RSAA actions to be used (a non-standard Action type)
declare module 'redux' {
  // tslint:disable-next-line:interface-name no-shadowed-variable
  interface Dispatch<S> {
    // tslint:disable-next-line:callable-types
    <A extends FSA | RSAA | BatchRSAA>(action: A | RSAA | BatchRSAA): any;
  }
}

// const showPersistentErrorToast = (toastOnError: string | boolean): IAddToast => ({
//   payload: {
//     iconType: 'error',
//     title: toastOnError === true ? 'An Error occurred' : (toastOnError as string),
//     duration: Infinity,
//   },
//   type: 'ADD_TOAST',
// });

export const apiTestMiddleware: Middleware = (api: MiddlewareAPI<any>) => (
  next: Dispatch<any>,
) => async (action: any): Promise<Dispatch<any>> => {
  if (!Utils.isRSAA(action)) {
    return next(action as FSA);
  }

  /** Normalize RSAA action types so we can dispatch them */
  const key = Object.keys(action)[0];
  const rsaaBody: Batch | NoBatch | BWBatch = action[key];
  const { types } = rsaaBody;
  const [request, success] = Utils.normalizeTypeDescriptors(types);

  /**
   * Allow __page_tests__ mock store to handle RSAAs. To actually test RSAA action creators,
   * do not use this middleware in your store. Follow the pattern in __tests__/middleware.test.ts.
   */
  next({ type: request.type });
  next({ type: success.type });
};

const apiMiddleware: Middleware = (api: MiddlewareAPI<any>) => (
  next: Dispatch<any>,
) => async (action: any): Promise<Dispatch<any>> => {
  // check to make sure this is an RSAA
  if (!Utils.isRSAA(action)) {
    return next(action as FSA);
  }

  const key = Object.keys(action)[0];
  const rsaaBody: Batch | NoBatch | BWBatch = action[key];
  const { types, method, schema, toastOnError, throwOnError } = rsaaBody;
  const [request, success, failure] = Utils.normalizeTypeDescriptors(types);

  // dispatch request FSA
  next(await Utils.actionWith(request, [rsaaBody]));

  const headers = Utils.buildHeaders(action);
  const url = Utils.buildUrl(action);
  const credentials = Utils.addCredentials(action);
  const reqBody = Utils.buildBody(action);
  let res: Response;
  let exception: any;
  try {
    // Make the actual API request
    res = await fetch(url, {
      body: reqBody,
      credentials,
      headers,
      method,
    });
  } catch (e) {
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
  } else {
    if (toastOnError) {
      // api.dispatch(showPersistentErrorToast(toastOnError));
    }

    const requestError = exception ? new RequestError(exception.message) : undefined;

    const failureFSA = await Utils.actionWith(
      {
        ...failure,
        error: true,
      },
      [rsaaBody, res, schema, api.dispatch, requestError],
    );

    if (exception && !(failureFSA.payload instanceof RequestError)) {
      failureFSA.payload = requestError;
    } else if (!(failureFSA.payload instanceof ApiError)) {
      failureFSA.payload = new ApiError(
        res.status,
        res.statusText,
        failureFSA.payload,
      );
    }

    const result = next(failureFSA);

    if (throwOnError) {
      throw failureFSA.payload;
    }

    return result;
  }
};

export default apiMiddleware;
