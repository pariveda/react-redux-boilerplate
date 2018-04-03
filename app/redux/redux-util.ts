import {
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  Store,
  StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';

import appInitialState from './initial-state';
import { apiMiddleware } from './middleware/api';

export default (reducer: Reducer<any>) => {
  return (initialState: any = appInitialState, options: any): Store<any> => {
    // Uncomment the following lines and comment out the below section to use remote dev tools instead
    // import devToolsEnhancer from 'remote-redux-devtools';
    // const composed: StoreEnhancer<any> = compose(
    //   applyMiddleware(thunk, apiMiddleware, auth),
    //   devToolsEnhancer(),
    // );

    const windowIfDefined = typeof window === 'undefined' ? null : (window as any);
    let composeEnhancers = compose;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionsBlacklist: [
          'FETCH_NOTIFICATIONS-SUCCESS',
          'FETCH_NOTIFICATIONS-REQUEST',
          'UPDATE_INDICATOR_WIDTHS_FOR_PRODUCT',
          'UPDATE_TOTAL_WIDTH_FOR_INDICATORS_FOR_PRODUCT',
        ],
      });
    }

    const composed: StoreEnhancer<any> = composeEnhancers(
      applyMiddleware(thunk, apiMiddleware),
    );

    const store = createStore(reducer, initialState, composed);

    return store;
  };
};
