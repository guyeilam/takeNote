import merge from 'lodash/merge';
import { OPEN_NAV_MODAL, CLOSE_NAV_MODAL, OPEN_MODAL } from '../actions/modal_actions';

export default function navModalIdReducer(state = null, action) {
  let newState;
  switch (action.type) {
    case OPEN_NAV_MODAL:
      return action.navModalId;
    case CLOSE_NAV_MODAL:
      // let newState = null;
      // return merge({}, state, newState);
      return state;
    case OPEN_MODAL:
      if (action.modal === 'new-notebook') {
        newState = state;
      } else {
        newState = action.navModalId;
      }
      return newState;
    default:
      return state;
  }
}