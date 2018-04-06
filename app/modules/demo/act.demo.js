import { API_CALL } from 'redux/middleware/api';
import { normalize, schema } from 'normalizr';
const demoSchema = new schema.Array(new schema.Entity('demo', {}, {
    idAttribute: 'code',
}));
export const updateText = (text) => ({
    type: 'UPDATE_TEXT',
    payload: text,
});
export const fetchData = () => {
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
//# sourceMappingURL=act.demo.js.map