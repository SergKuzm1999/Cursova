import axios from 'axios';
import { GET_CATEGORIES } from './types';

export function setCategories(data) {
    return {
      type: GET_CATEGORIES,
      categories: data
    }
  }

  export function getCategories() {
    return dispatch => {
      return axios.get('Categories/GetCategories')
        .then(res => {
          console.log("D",res.data);
          dispatch(setCategories(res.data));
        })
    }
  }