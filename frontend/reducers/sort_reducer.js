import merge from 'lodash/merge';
import { SET_SORT } from '../actions/ui_actions';

export default function sortReducer(state = null, action) {
  let newState;
  switch (action.type) {
    case SET_SORT:
      newState = action.sortMethod || null;
      return newState;
    default:
      return state;
  }
}