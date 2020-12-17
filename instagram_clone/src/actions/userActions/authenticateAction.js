import {
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS
} from '../../types/index';
import axios from '../../config/axios';
import authenticateToken from '../../utils/authenticateToken';


export function authenticateUser() {
  return async dispatch => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      authenticateToken(authToken);
    } else {
      return;
    }

    try {
      const user = await axios.get('/api/authentication/authenticate');

      dispatch(authenticateSuccess(user.data.user));
    } catch (error) {
      dispatch(authenticateError(error.response.data));
    }
  };
};

const authenticateSuccess = userData => ({
  type: AUTHENTICATION_SUCCESS,
  payload: userData
});

const authenticateError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});