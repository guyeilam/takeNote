import { combineReducers } from 'redux';

import modal from './modal_reducer';
import navModal from './nav_modal_reducer';
import navModalId from './nav_modal_id_reducer';
import currentNoteReducer from './current_note_reducer';
import sortReducer from './sort_reducer';

export default combineReducers({
  modal,
  navModal,
  navModalId,
  currentNote: currentNoteReducer,
  sort: sortReducer
});