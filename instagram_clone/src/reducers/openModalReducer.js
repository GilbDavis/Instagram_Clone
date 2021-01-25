import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/index';

const initialState = {
  showModal: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
    default:
      return state;
  }
}