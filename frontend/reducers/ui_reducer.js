import { combineReducers } from 'redux';

import modal from './modal_reducer';
import sort from './sort_reducer';

export default combineReducers({
  modal,
  sort
});