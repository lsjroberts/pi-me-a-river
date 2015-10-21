import { RESULTS_UPDATE } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case RESULTS_UPDATE:
      return action.results;
    default:
      return state;
  }
}
