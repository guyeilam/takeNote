import merge from 'lodash/merge';

import { RECEIVE_SINGLE_NOTEBOOK } from '../actions/notebook_actions';

const notesReducer = (state = {}, action) => {
  Object.freeze(state);

  let notes;

  switch (action.type) {
    case RECEIVE_SINGLE_NOTEBOOK:
      notes = action.payload.notes;
      return merge({}, state, notes);
    default:
      return state;
  }
};

export default notesReducer;