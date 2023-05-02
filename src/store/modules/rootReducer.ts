
import { combineReducers } from '@reduxjs/toolkit';

import errandsRedux from './errandsSlice';
import registerRedux from './registerSlice';
import userLoggedRedux from './userLoggedSlice';
import alertReducer from './alertslice';





export default combineReducers({
  errands: errandsRedux,
  register: registerRedux,
  userLogged: userLoggedRedux,
  alertSlice: alertReducer

});
