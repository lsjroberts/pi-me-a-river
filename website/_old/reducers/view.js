import { CHANGE_VIEW } from '../constants/ActionTypes';
import { HOME } from '../constants/Views';

export default function (state = HOME, action) {
  switch (action.type) {
  case CHANGE_VIEW:
    return action.view;

  default:
    return state;
  }
}