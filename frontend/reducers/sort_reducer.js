import merge from 'lodash/merge';
import { SET_SORT } from '../actions/ui_actions';

export default function sortReducer(state = 'updated_date_descending', action) {
  let newState;
  switch (action.type) {
    case SET_SORT:
      newState = action.sortMethod || 'updated_date_descending';
      return newState;
    default:
      return state;
  }
}