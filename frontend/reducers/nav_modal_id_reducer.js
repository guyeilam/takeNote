import { OPEN_NAV_MODAL, CLOSE_NAV_MODAL } from '../actions/modal_actions';

export default function navModalIdReducer(state = null, action) {
  switch (action.type) {
    case OPEN_NAV_MODAL:
      return action.navModalId;
    case CLOSE_NAV_MODAL:
      return null;
    default:
      return state;
  }
}