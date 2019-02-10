import { SET_CURRENT_NOTE } from '../actions/note_actions';

export default function currentNoteReducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_NOTE:
      return action.noteId;
    default:
      return state;
  }
}
