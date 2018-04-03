import { Actions } from './act.demo';

export interface IState {
  text: string;
  isLoading: boolean;
  demoItems: string[];
}

export const initialState: IState = {
  text: '',
  isLoading: true,
  demoItems: [],
};

export default (state: IState = initialState, action: Actions) => {
  switch (action.type) {
    case 'FETCH_DATA-REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DATA-SUCCESS':
      return {
        ...state,
        isLoading: false,
        demoItems: action.payload.result,
      };
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};
