import {
  SET_POST_LIKE_ERROR,
  SET_POST_LIKE_SUCCESS
} from '../../types/index';
import axios from '../../config/axios';

export function setLikeAndUnlike(photoId) {
  return async dispatch => {
    try {
      const data = await axios.put(`/api/p/like/${photoId}`);

      dispatch(setLikeAndUnlike_SUCCESS(data.data));
    } catch (error) {
      setLikeAndUnlike_ERROR(error.response.data);
    }
  };
};

const setLikeAndUnlike_SUCCESS = data => ({
  type: SET_POST_LIKE_SUCCESS,
  payload: data
});

const setLikeAndUnlike_ERROR = err => ({
  type: SET_POST_LIKE_ERROR,
  payload: err
});