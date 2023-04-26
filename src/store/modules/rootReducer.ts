
import { combineReducers } from '@reduxjs/toolkit';

import errands from './errandsSlice';
import register from './registerSlice';
import userLogged from './userLoggedSlice';


export default combineReducers({
  errands,
  register,
  userLogged,
});
