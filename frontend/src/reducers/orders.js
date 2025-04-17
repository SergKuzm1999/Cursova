import { GET_ORDERS, NEW_ORDER } from '../actions/types';

const initialState = {
    orders: [],
    count_orders : 0
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ORDERS: {
            return {
                orders: action.orders,
                count_orders: action.count_orders
            };
        }
        case NEW_ORDER:{
            return {
                ...state,
                orders: [...state.orders, action.orders]
            };
        }
        default: return state;
    }
}
