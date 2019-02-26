import { RECEIVE_ALL_NOTEBOOKS, RECEIVE_SINGLE_NOTEBOOK, REMOVE_NOTEBOOK, RECEIVE_UPDATED_NOTEBOOK, START_LOADING_NOTEBOOKS } from '../actions/notebook_actions';
import { RECEIVE_ALL_NOTES, RECEIVE_SINGLE_NOTE, REMOVE_NOTE, START_LOADING_NOTES } from '../actions/note_actions';

export default function loadingReducer(state = null, action) {
  switch (action.type) {
    case START_LOADING_NOTES, START_LOADING_NOTEBOOKS:
      return true;
    case RECEIVE_ALL_NOTEBOOKS, RECEIVE_SINGLE_NOTEBOOK, REMOVE_NOTEBOOK, RECEIVE_UPDATED_NOTEBOOK:
      return null;
    case RECEIVE_ALL_NOTES, RECEIVE_SINGLE_NOTE, REMOVE_NOTE:
      return null;
    default:
      return state;
  }
}