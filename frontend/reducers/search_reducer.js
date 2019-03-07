import { SET_SEARCH_RESULTS } from '../actions/ui_actions';

export default function searchReducer(state = null, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return action.noteIds;
    default:
      return state;
  }
}
