import {
  CREATEPOST_ERROR,
  CREATEPOST_START,
  CREATEPOST_SUCCESS,
  CREATEPOST_UPLOAD_PROGRESS,
  GET_FOLLOWING_POSTS_START,
  GET_FOLLOWING_POSTS_ERROR,
  GET_FOLLOWING_POSTS_SUCCESS
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
    case GET_FOLLOWING_POSTS_START:
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
    case GET_FOLLOWING_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        uploadProgress: null
      }
    case CREATEPOST_ERROR:
    case GET_FOLLOWING_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        uploadProgress: null
      }
    default:
      return state;
  }
}