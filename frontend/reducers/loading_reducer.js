import { RECEIVE_ALL_NOTEBOOKS } from '../actions/notebook_actions';
import { RECEIVE_ALL_NOTES } from '../actions/note_actions';
import { START_LOADING } from '../actions/loading_actions';

export default function loadingReducer(state = null, action) {
  switch (action.type) {
    case START_LOADING:
      return true;
    case RECEIVE_ALL_NOTEBOOKS:
      return null;
    case RECEIVE_ALL_NOTES:
      return null;
    default:
      return state;
  }
}