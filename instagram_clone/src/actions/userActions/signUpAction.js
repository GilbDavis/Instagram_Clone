import {
  SIGNUP_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS
} from '../../types/index';

import axios from '../../config/axios';

export function startSignUpAction(userDTO) {
  return async dispatch => {
    dispatch(startSignUp());

    try {
      const userData = await axios.post("/api/authentication/signup", userDTO);

      dispatch(startSignUpSuccess(userData.data));
    } catch (error) {
      dispatch(startSignUpError(error.response.data));
    }
  };
};

const startSignUp = () => ({
  type: SIGNUP_START,
  payload: true
});

const startSignUpError = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

const startSignUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
});