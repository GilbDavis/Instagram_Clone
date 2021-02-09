import {
  SET_POST_COMMENT_ERROR,
  SET_POST_COMMENT_SUCCESS
} from '../../types/index';
import axios from '../../config/axios';

export function addCommentAction(photoId, comment) {
  return async dispatch => {
    try {
      const fetchData = await axios.post(`/api/p/comment/${photoId}`, { comment });

      dispatch(addComment_SUCCESS(fetchData.data.comment));
    } catch (error) {
      dispatch(addComment_ERROR(error.response.data));
    }
  };
};

const addComment_SUCCESS = data => ({
  type: SET_POST_COMMENT_SUCCESS,
  payload: data
});

const addComment_ERROR = err => ({
  type: SET_POST_COMMENT_ERROR,
  payload: err
});