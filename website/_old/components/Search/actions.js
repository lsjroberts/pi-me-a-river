// import fetch from 'isomorphic-fetch';

import * as types from './ActionTypes';

export function searchRivers (term) {
  return {
    type: types.SEARCH_RIVERS,
    term
  };
  // return function (dispatch) {
  //   dispatch(requestSearchRivers(term));

  //   return fetch('http://localhost:3000/api/1.0/search?name=' + encodeUriComponent(term))
  //     .then(response => response.json())
  //     .then(json => dispatch(receiveSearchRivers(json)))
  //     .catch(error => console.error(error));
  // }
}

export function clearRivers () {
  return {
    type: types.CLEAR_RIVERS
  };
}

function requestRivers (term) {
  return {
    type: types.REQUEST_RIVERS,
    term
  };
}

function receiveRivers (json) {
  let rivers = json.rivers;

  return {
    type: types.RECEIVE_RIVERS,
    rivers
  };
}
