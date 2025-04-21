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
    return axios.post('Account/Logout');
  };
}
export function login(data) {
  return dispatch => {
    return axios.post('Account/Login', data)
      .then(res => {
        loginByJWT(res.data.token, dispatch);
      });
  }
}
const loginByJWT = (token, dispatch) => {
    var user = jwt.decode(token);
    localStorage.setItem('jwtToken', token);
    console.log("A" + token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(user));
}
export function register(data) {
  return dispatch => {
    return axios.post('Account/Register', data);
  }
}

export function changeUserName(name) {
  return dispatch => {
    return dispatch(changeName(name));
  }
};



