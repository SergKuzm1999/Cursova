import axios from 'axios';
import { GET_USERS} from './types';

export function setUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}


export function getUsers() {
  return dispatch => {
      return axios.get('/Account/GetUsers')
      .then(res => {
        dispatch(setUsers(res.data));
      });
  }
}
  export function GetUserInfoById(userId) {
    return dispatch => {
        return axios.get('/Account/GetUserInfoById/'+ userId)
        .then(res => {
          dispatch(setUsers(res.data));
        });
    }
}
