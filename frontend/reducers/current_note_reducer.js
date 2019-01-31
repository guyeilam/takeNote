import { RECEIVE_SINGLE_NOTE, RECEIVE_ALL_NOTES, SET_CURRENT_NOTE } from '../actions/note_actions';
import { RECEIVE_SINGLE_NOTEBOOK } from '../actions/notebook_actions';
import { merge } from 'lodash/merge';

export default function currentNoteReducer(state = null, action) {

  switch (action.type) {
    case SET_CURRENT_NOTE:
      return action.payload.notes[action.currentNote.id];
    case RECEIVE_SINGLE_NOTE:
      return Object.values(action.payload.notes)[0];
    case RECEIVE_ALL_NOTES:
      if (!state) {
        return Object.values(action.notes)[0];
      } else {
        return state;
      }
    case RECEIVE_SINGLE_NOTEBOOK:
      if (action.payload.notes) {  
        return Object.values(action.payload.notes)[0];
      } else {
        return state;
      }
    default:
      return state;
  }
}
