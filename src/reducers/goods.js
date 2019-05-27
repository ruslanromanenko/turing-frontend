const initialState = {
    isLoading: true,
    goods: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GOODS':
            return {
                ...state,
                goods: action.payload,
                isLoading: false
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}