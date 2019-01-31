import { RECEIVE_NOTE_ERRORS, RECEIVE_ALL_NOTES} from '../actions/note_actions';

const notesErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_NOTE_ERRORS:
      return action.errors;
    case RECEIVE_ALL_NOTES:
      return [];
    default:
      return oldState;
  }
}

export default notesErrorsReducer;