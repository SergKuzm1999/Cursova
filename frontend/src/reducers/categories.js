import { GET_CATEGORIES } from '../actions/types';

const initialState = {
    categories: []
  };

  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case GET_CATEGORIES:
        return {
            categories: action.categories
        };
        default: return state;
    }
  }