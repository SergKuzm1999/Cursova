import { GET_CURRENT_GENDER } from './types';

export function set_current_gender(data){
    return {
        type: GET_CURRENT_GENDER,
        current_gender: data
      }
}
export function change_current_gender(current_gender) {
    return dispatch => {
        localStorage.setItem('current_gender', current_gender);
        dispatch(set_current_gender(current_gender));
    }
}

 