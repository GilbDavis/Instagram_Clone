import {
  CREATEPOST_ERROR,
  CREATEPOST_START,
  CREATEPOST_SUCCESS,
  CREATEPOST_UPLOAD_PROGRESS,
  GET_FOLLOWING_POSTS_START,
  GET_FOLLOWING_POSTS_ERROR,
  GET_FOLLOWING_POSTS_SUCCESS,
  SET_POST_LIKE_ERROR,
  SET_POST_LIKE_SUCCESS,
  SET_POST_COMMENT_ERROR,
  SET_POST_COMMENT_SUCCESS
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
    case SET_POST_LIKE_SUCCESS:
      const newPosts = [...state.posts];
      const foundIndex = newPosts.findIndex(element => element.postInfo.id === action.payload.likePhotoId);
      if (action.payload.exists === true) {
        newPosts[foundIndex].likes.total += 1;
        newPosts[foundIndex].likes.updated = true;
      } else if (action.payload.exists === false) {
        newPosts[foundIndex].likes.total -= 1;
        newPosts[foundIndex].likes.updated = false;
      }

      return {
        ...state,
        posts: newPosts,
        error: null
      }
    case SET_POST_LIKE_ERROR:
    case SET_POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_POST_COMMENT_SUCCESS:
      const postsCopy = [...state.posts];
      const index = postsCopy.findIndex(element => element.postInfo.id === action.payload.photoId);
      postsCopy[index].comments.push({
        commentId: action.payload.commentId,
        commentText: action.payload.commentText,
        owner: action.payload.owner
      });

      return {
        ...state,
        posts: postsCopy
      }
    default:
      return state;
  }
}