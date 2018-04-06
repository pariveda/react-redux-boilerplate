import { combineReducers } from 'redux';
import entities from './entities/rdc.root';
import interactive from './interactive/rdc.root';
const appReducer = combineReducers({
    entities,
    interactive,
});
export default (state, action) => {
    // Reset state on logout
    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    return appReducer(state, action);
};
//# sourceMappingURL=global-reducer.js.map