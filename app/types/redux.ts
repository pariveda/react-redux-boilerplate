import {
  ActionCreator as ReduxActionCreator,
  Dispatch as ReduxDispatch,
} from 'redux';
import { ThunkAction } from 'redux-thunk';

import FSA from './fsa';
import IGlobalState from './global-state';
import RSAA, { BatchRSAA } from './rsaa';

export type ActionReturn =
  | FSA
  | RSAA
  | ThunkAction<RSAA | FSA | void, IGlobalState, void>;

// tslint:disable:interface-name
interface ActionCreator extends ReduxActionCreator<ActionReturn> {
  (...args: any[]): ActionReturn;
}

export type Dispatch = ReduxDispatch<FSA | RSAA | BatchRSAA>;

export default ActionCreator;
