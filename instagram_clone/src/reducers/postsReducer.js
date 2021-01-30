import {
  CREATEPOST_ERROR,
  CREATEPOST_START,
  CREATEPOST_SUCCESS,
  CREATEPOST_UPLOAD_PROGRESS
} from '../types/index';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  uploadProgress: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATEPOST_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload
      }
    case CREATEPOST_START:
      return {
        ...state,
        loading: action.payload
      }
    case CREATEPOST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        uploadProgress: null
      }

    case CREATEPOST_ERROR:
      return {
        ...state
      }
    default:
      return state;
  }
}