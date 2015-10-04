import * as types from './ActionTypes';

let initialState = {
  rivers: [],
  term: "",
  isFetching: false
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.SEARCH_RIVERS:
    return {
      ...state,
      term: action.term
    };

  case types.REQUEST_RIVERS:
    return {
      ...state,
      isFetching: true
    }

  case types.RECEIVE_RIVERS:
    return {
      ...state,
      isFetching: false,
      rivers: action.rivers
    };

  default:
    return state;
  }
}
