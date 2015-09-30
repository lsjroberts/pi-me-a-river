import * as types from './ActionTypes';

export default function (state = 'home', action) {
  switch (action.type) {
  case types.REDIRECT:
    return action.route;

  default:
    return state;
  }
}
