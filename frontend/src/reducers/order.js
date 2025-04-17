import { NEW_ORDER } from '../actions/types';

const initialState = {
    order: []
  };
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case NEW_ORDER:
        return {
            ...state,
            order: [...state.order, action.order]
        };
        default: return state;
    }
  }
