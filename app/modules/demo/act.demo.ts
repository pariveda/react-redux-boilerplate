import { API_CALL } from 'redux/middleware/api';
import FSA from 'types/fsa';
import RSAA from 'types/rsaa';

import { normalize, schema } from 'normalizr';

const demoSchema = new schema.Array(
  new schema.Entity(
    'demo',
    {},
    {
      idAttribute: 'code',
    },
  ),
);

interface IUpdateText extends FSA {
  type: 'UPDATE_TEXT';
  payload: string;
}

export const updateText = (text: string): IUpdateText => ({
  type: 'UPDATE_TEXT',
  payload: text,
});

interface IFetchDataRequest extends FSA {
  type: 'FETCH_DATA-REQUEST';
}

interface IFetchDataSuccess extends FSA {
  type: 'FETCH_DATA-SUCCESS';
  payload: any;
}

export const fetchData = (): RSAA => {
  return {
    [API_CALL]: {
      method: 'GET',
      endpoint: 'http://localhost:9000/demo-items',
      types: [
        'FETCH_DATA-REQUEST',
        {
          type: 'FETCH_DATA-SUCCESS',
          payload: (action, res, data, dispatch) => {
            const result = normalize(data, demoSchema);
            console.log(result);
            return result;
          },
        },
        'FETCH_DATA-FAILURE',
      ],
    },
  };
};

export type Actions = IUpdateText | IFetchDataRequest | IFetchDataSuccess;
