const initialState = {
    category: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                category: action.payload,
            };
        default:
            return state;
    }
}