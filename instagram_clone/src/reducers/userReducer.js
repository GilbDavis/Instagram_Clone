import {

} from '../types/index';

const initialState = {
  name: null,
  email: null,
  imagePath: null,
  userName: null,
  isAuthenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};