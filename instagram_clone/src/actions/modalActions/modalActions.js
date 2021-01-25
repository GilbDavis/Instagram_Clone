import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../../types/index';

export function openModal() {
  return async dispatch => {
    dispatch(openModalSuccess());
  };
};

const openModalSuccess = () => ({
  type: OPEN_MODAL,
  payload: true
});

export function closeModal() {
  return async dispatch => {
    dispatch(closeModalSuccess());
  };
};

const closeModalSuccess = () => ({
  type: CLOSE_MODAL,
  payload: false
});