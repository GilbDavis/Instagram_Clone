import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../../types/index';

import axios from '../../config/axios';

export function startSessionAction(email, password) {
  return async dispatch => {
    dispatch(startSession());

    try {
      const userData = await axios.post('/api/authentication/login', { email, password });

      dispatch(startSessionSuccess(userData.data));
    } catch (error) {
      dispatch(startSessionError(error.response.data));
    }
  };
}

const startSession = () => ({
  type: LOGIN_START,
  payload: true
});

const startSessionError = error => ({
  type: LOGIN_ERROR,
  payload: error
});

const startSessionSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});
