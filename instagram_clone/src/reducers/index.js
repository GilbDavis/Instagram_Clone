import { combineReducers } from 'redux';
import userReducer from './userReducer';
import openModalReducer from './openModalReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  user: userReducer,
  modal: openModalReducer,
  post: postsReducer
});