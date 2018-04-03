import { AnyAction, combineReducers } from 'redux';
import IGlobalState from 'types/global-state';
import entities from './entities/rdc.root';
import interactive from './interactive/rdc.root';

const appReducer = combineReducers<IGlobalState>({
  entities,
  interactive,
});

export default (state: IGlobalState, action: AnyAction) => {
  // Reset state on logout
  // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
  return appReducer(state, action);
};
