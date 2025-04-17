import axios from 'axios';
import { GET_REVIEWS } from './types';
export function setReviews(data) {
    return {
      type: GET_REVIEWS,
      reviews: data
    }
  }
  export function getReviews() {
    return dispatch => {
      return axios.get('api/products/getreviews/')
        .then(res => {
          dispatch(setReviews(res.data));
        })
    }
  }