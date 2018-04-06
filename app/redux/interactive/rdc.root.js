import demo, { initialState as demoState, } from 'modules/demo/rdc.demo';
import { combineReducers } from 'redux';
export const initialState = {
    demo: demoState,
};
const appReducer = combineReducers({
    demo,
});
export default (state = initialState, action) => appReducer(state, action);
//# sourceMappingURL=rdc.root.js.map