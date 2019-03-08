import { SET_SEARCH_TERM } from '../actions/ui_actions';

export default function searchTermReducer(state = null, action) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.searchTerm;
    default:
      return state;
  }
}
