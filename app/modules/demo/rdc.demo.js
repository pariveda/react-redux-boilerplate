export const initialState = {
    text: '',
    isLoading: true,
    demoItems: [],
};
export default (state = initialState, action) => {
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
//# sourceMappingURL=rdc.demo.js.map