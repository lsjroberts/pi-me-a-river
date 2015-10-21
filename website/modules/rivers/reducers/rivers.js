import * as types from '../constants';


export default function (state = {}, action) {
  switch (action.type) {
    case types.RIVERS_SET:
      return { ...state, [action.id]: action.river };

    case types.RIVERS_REMOVE:
      return { } // TODO: remove river from list purely

    case types.RIVERS_RESET:
      return {};
  }
}
