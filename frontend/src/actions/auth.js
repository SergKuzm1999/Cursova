import axios from 'axios';
import { SET_CURRENT_USER, CHANGE_USER_NAME } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function changeName(name) {
  return {
    type: CHANGE_USER_NAME,
    userName: name
  };
};
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
};
}
export function login(data) {
  return dispatch => {
    return axios.post('api/Account/login', data)
    .then(res => {
      loginByJWT(res.data, dispatch);
    });
}
}
const loginByJWT = (token, dispatch) => {
  var user=jwt.decode(token);
  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser(user));
} 
export function register(data) {
  console.log('--data--', data);
  return dispatch => {
      return axios.post('api/Account/Register', data)
          .then(res => {
              //console.log("data register", res);
              loginByJWT(res.data, dispatch);
          });
  }
}

export function changeUserName(name) {
  return dispatch => {
      return dispatch(changeName(name));
  }
};



