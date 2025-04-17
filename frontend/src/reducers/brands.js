import { GET_BRANDS } from '../actions/types';

const initialState = {
    brands: []
  };

  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case GET_BRANDS:
        return {
            brands: action.brands
        };
        default: return state;
    }
  }