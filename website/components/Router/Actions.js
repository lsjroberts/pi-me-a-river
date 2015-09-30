import * as types from './ActionTypes';

export function redirect (route) {
  return {
    type: types.REDIRECT,
    route
  };
}
