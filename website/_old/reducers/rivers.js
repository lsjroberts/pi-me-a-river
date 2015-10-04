import { SEARCH_RIVERS,
         FIND_RIVER,
         CLEAR_RIVERS
       } from '../constants/ActionTypes';

import { MockRivers } from '../mocks';


export default function (state = [], action) {
  console.log(action);

  switch (action.type) {
  case SEARCH_RIVERS:
    return MockRivers.filter(river =>
      river.name.toLowerCase().indexOf(action.text.toLowerCase()) === 0
    );

  case FIND_RIVER:
    return MockRivers.filter(river =>
      river.id === action.id
    );

  case CLEAR_RIVERS:
    return [];

  default:
    return state;
  }
}