import { SORT_NOTEBOOKS_TOGGLE } from '../actions/notebook_actions';

export default function sortReducer(state = false, action) {
  switch (action.type) {
    case SORT_NOTEBOOKS_TOGGLE:
      return action.sort;
    default:
      return state;
  }
}
