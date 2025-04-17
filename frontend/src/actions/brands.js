import axios from 'axios';
import { GET_BRANDS } from './types';

export function setBrands(data) {
    return {
      type: GET_BRANDS,
      brands: data
    }
  }

  export function getBrands() {
    return dispatch => {
      return axios.get('api/brands/GetBrands')
        .then(res => {
          dispatch(setBrands(res.data));
        })
    }
  }