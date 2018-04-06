import { applyMiddleware, compose, createStore, } from 'redux';
import thunk from 'redux-thunk';
import appInitialState from './initial-state';
import { apiMiddleware } from './middleware/api';
export default (reducer) => {
    return (initialState = appInitialState, options) => {
        // Uncomment the following lines and comment out the below section to use remote dev tools instead
        // import devToolsEnhancer from 'remote-redux-devtools';
        // const composed: StoreEnhancer<any> = compose(
        //   applyMiddleware(thunk, apiMiddleware, auth),
        //   devToolsEnhancer(),
        // );
        const windowIfDefined = typeof window === 'undefined' ? null : window;
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
        const composed = composeEnhancers(applyMiddleware(thunk, apiMiddleware));
        const store = createStore(reducer, initialState, composed);
        return store;
    };
};
//# sourceMappingURL=redux-util.js.map