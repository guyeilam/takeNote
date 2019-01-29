import { combineReducers } from 'redux';

import modal from './modal_reducer';
import navModal from './nav_modal_reducer';
import navModalId from './nav_modal_id_reducer';
import sort from './sort_reducer';

export default combineReducers({
  modal,
  navModal,
  navModalId,
  sort
});