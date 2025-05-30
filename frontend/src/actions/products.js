import axios from 'axios';
import { GET_PRODUCTS, ADD_PRODUCT_REVIEW, NEW_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from './types';

export function setProducts(data) {
  return {
    type: GET_PRODUCTS,
    products: data
  }
}
export function addReview(review) {
  return {
    type: ADD_PRODUCT_REVIEW,
    review: review
  };
}
export function addProduct(product) {
  return {
    type: NEW_PRODUCT,
    product: product
  };
}
export function delProduct(id) {
  return {
    type: DELETE_PRODUCT,
    products: id
  };
}
export function putProduct(product) {
  return {
    type: EDIT_PRODUCT,
    products: product
  };
}
export function getProducts() {
  return dispatch => {
    return axios.get('//All')
      .then(res => {
        dispatch(setProducts(res.data));
      })
  }
}
export function getNewsProducts(pagination, gender) {
  return dispatch => {
    return axios.get('/Products/News/' + pagination + '?gender=' + gender)
      .then(res => {
        dispatch(setProducts(res.data));
      })
  }
}
export function getDiscountsProducts(pagination, gender) {
  return dispatch => {
    return axios.get('/Products/Discounts/' + pagination + '?gender=' + gender)
      .then(res => {
        dispatch(setProducts(res.data));
      })
  }
}
export function getProductById(id) {
  return dispatch => {
    return axios.get('/Products/ById/' + id)
      .then(res => {
        dispatch(setProducts(res.data));
      })
  }
}
export function getProductsByParams(gender, category, brand, color, size, minprice, maxprice, name, sort, pagination) {
  return dispatch => {
    return axios.get('/Products/ByParams?gender=' + gender + '&category=' + category + '&brand=' + brand
      + '&color=' + color + '&size=' + size + '&minprice=' + minprice + '&maxprice=' + maxprice + '&name=' + name + '&sort=' + sort 
      +'&pagination=' + pagination)
      .then(res => {
        dispatch(setProducts(res.data));
      })
  }
}
export function newProduct(product) {
  return dispatch => {
    return axios.post('Products/News', product)
      .then(res => {
        dispatch(addProduct(res.data));
      })
  }
}
export function deleteProduct(id) {
  return dispatch => {
    return axios.delete('api/products/DeleteProduct/' + id)
      .then(res => {
        dispatch(delProduct(res.data));
      })
  }
}
export function editProduct(id, product) {
  return dispatch => {
    return axios.put('api/products/EditProduct/' + id, product)
      .then(res => {
        dispatch(putProduct(res.data));
      })
  }
}
export function addProductReview(review) {
  return dispatch => {
    return axios.post('/Products/NewReview', review)
      .then(res => {
        dispatch(addReview(res.data));
      })
  }
}
