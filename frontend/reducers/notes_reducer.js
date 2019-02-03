import merge from 'lodash/merge';

import { RECEIVE_SINGLE_NOTEBOOK, RECEIVE_ALL_NOTEBOOKS } from '../actions/notebook_actions';
import { RECEIVE_SINGLE_NOTE, RECEIVE_ALL_NOTES, SET_CURRENT_NOTE } from '../actions/note_actions';

const notesReducer = (state = {}, action) => {
  Object.freeze(state);

  let notes;

  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      return action.payload.notes;
    case RECEIVE_SINGLE_NOTEBOOK:
      notes = action.payload.notes;
      return merge({}, notes);
    case RECEIVE_SINGLE_NOTE:
      return merge({}, state, action.payload.notes);
    case RECEIVE_ALL_NOTES:
      return action.notes;
    case SET_CURRENT_NOTE:
      return action.payload.notes;
    default:
      return state;
  }
};

export default notesReducer;