import * as types from '../constants/ActionTypes';

export function searchRivers(text) {
  return {
    type: types.SEARCH_RIVERS,
    text
  };
}

export function findRiver(id) {
  return {
    type: types.FIND_RIVER,
    id
  };
}

export function clearRivers() {
  return {
    type: types.CLEAR_RIVERS
  };
}
