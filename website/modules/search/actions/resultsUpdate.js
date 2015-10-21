import { RESULTS_UPDATE } from '../constants';

export default function (results) {
  type: RESULTS_UPDATE,
  results
};
