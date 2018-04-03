import demo, {
  initialState as demoState,
  IState as IDemoState,
} from 'modules/demo/rdc.demo';
import { AnyAction, combineReducers } from 'redux';

export interface IState {
  demo: IDemoState;
}

export const initialState: IState = {
  demo: demoState,
};

const appReducer = combineReducers({
  demo,
});

export default (state: IState = initialState, action: AnyAction) =>
  appReducer(state, action);
