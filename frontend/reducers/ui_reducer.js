import { combineReducers } from 'redux';

import modal from './modal_reducer';
import navModal from './nav_modal_reducer';
import navModalId from './nav_modal_id_reducer';
import currentNoteReducer from './current_note_reducer';
import sortReducer from './sort_reducer';
import loadingReducer from './loading_reducer';
import searchReducer from './search_reducer';
import searchTermReducer from './search_term_reducer';

export default combineReducers({
  modal,
  navModal,
  navModalId,
  currentNote: currentNoteReducer,
  sort: sortReducer,
  loading: loadingReducer,
  search: searchReducer,
  searchTerm: searchTermReducer
});