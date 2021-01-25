import { combineReducers } from 'redux';
import userReducer from './userReducer';
import openModalReducer from './openModalReducer';

export default combineReducers({
  user: userReducer,
  modal: openModalReducer
});