import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_START,
  SIGNUP_ERROR,
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS
} from '../types/index';

const initialState = {
  userData: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        loading: action.payload
      }
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case AUTHENTICATION_ERROR:
      localStorage.removeItem('authToken');
      return {
        ...state,
        userData: null,
        isAuthenticated: false,
        error: {
          errorMessage: (action.payload.message) ? action.payload.message : null,
          validationErrors: (Array.isArray(action.payload)) ? action.payload.errors.map(err => err.msg) : null
        },
        loading: false
      }
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false
      }
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('authToken', action.payload.token);
      return {
        ...state,
        loading: false,
        userData: action.payload.user,
        error: null,
        isAuthenticated: true
      }
    default:
      return state;
  }
};