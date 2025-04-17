import { GET_CURRENT_GENDER, CHANGE_CURRENT_GENDER} from '../actions/types';

const initialState = {
    current_gender: ''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_CURRENT_GENDER:
            return {
                current_gender: action.current_gender
            };
        case CHANGE_CURRENT_GENDER:
            return {
                ...state,
                current_gender: action.current_gender
            };
        default: return state;
    }
}