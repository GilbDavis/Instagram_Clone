import {
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_START,
  AUTHENTICATION_TOKEN_ERROR
} from '../../types/index';
import axios from '../../config/axios';
import authenticateToken from '../../utils/authenticateToken';


export function authenticateUser() {
  return async dispatch => {
    dispatch(authenticationStart());

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      authenticateToken(authToken);
    } else {
      return dispatch(authenticateTokenNotExist());
    }

    try {
      const user = await axios.get('/api/authentication/authenticate');

      dispatch(authenticateSuccess(user.data.user));
    } catch (error) {
      dispatch(authenticateError(error.response.data));
    }
  };
};

const authenticationStart = () => ({
  type: AUTHENTICATION_START,
  payload: true
});

const authenticateSuccess = userData => ({
  type: AUTHENTICATION_SUCCESS,
  payload: userData
});

const authenticateError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});

const authenticateTokenNotExist = () => ({
  type: AUTHENTICATION_TOKEN_ERROR,
  payload: false
});