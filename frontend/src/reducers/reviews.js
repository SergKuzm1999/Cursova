import { GET_REVIEWS } from '../actions/types';

const initialState = {
    reviews: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                reviews: action.reviews
            };
        default: return state;
    }
}