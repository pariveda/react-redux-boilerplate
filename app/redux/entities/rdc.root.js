export const initialState = {
    demo: {},
};
export default (state = initialState, action) => {
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
//# sourceMappingURL=rdc.root.js.map