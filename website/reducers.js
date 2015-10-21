import { routerStateReducer as router } from 'redux-router';
import * as modules from '../modules/reducers';
import { combineReducers } from 'redux';

export default combineReducers({
  router,
  modules
});


