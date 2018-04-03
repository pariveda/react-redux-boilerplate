import IDemoItem from 'modules/demo/demo.type';

export interface IState {
  demo: { [key: string]: IDemoItem };
}

export const initialState: IState = {
  demo: {},
};

export default (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case 'FETCH_DATA-SUCCESS':
      return {
        ...state,
        demo: action.payload.entities.demo,
      };
    default:
      return state;
  }
};
