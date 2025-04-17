import { GET_RECOMMENDED_PRODUCTS } from '../actions/types';

const initialState = {
    recommended_products: []
  };

  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case GET_RECOMMENDED_PRODUCTS:
        return {
            recommended_products: action.recommended_products
        };
        default: return state;
    }
  }