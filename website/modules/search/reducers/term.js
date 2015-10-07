import { TERM_UPDATE } from '../constants';

export default function (state = "", action) {
  switch (action.type) {
    case TERM_UPDATE:
      return action.term;
    default:
      return state;
  }
}
