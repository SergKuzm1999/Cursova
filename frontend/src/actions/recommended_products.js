import axios from 'axios';
import { GET_RECOMMENDED_PRODUCTS } from './types';

export function setRecommendedProducts(data) {
  return {
    type: GET_RECOMMENDED_PRODUCTS,
    recommended_products: data
  }
}
export function getRecommendedProducts(category,currentProductId,pagination, gender_now) {
 
  return dispatch => {
    return axios.get('api/products/ByParams?category=' + category +'&gender=' + gender_now + '&pagination='+pagination)
      .then(res => {
        res.data = res.data.products.filter(value =>  value[0].id !== parseInt(currentProductId,10) );
        dispatch(setRecommendedProducts(res.data));
      })
  }
}