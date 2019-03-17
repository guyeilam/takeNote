import merge from 'lodash/merge';

import { RECEIVE_SINGLE_NOTEBOOK, RECEIVE_ALL_NOTEBOOKS } from '../actions/notebook_actions';
import { RECEIVE_SINGLE_NOTE, RECEIVE_ALL_NOTES, REMOVE_NOTE, RECEIVE_UPDATED_NOTE } from '../actions/note_actions';
import { RECEIVE_SINGLE_TAG, RECEIVE_UPDATED_TAGGING } from '../actions/tag_actions';

const notesReducer = (state = {}, action) => {
  Object.freeze(state);

  let notes;
  let newState;
  let updatedNote;

  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      newState = action.payload.notes;
      return merge({}, newState);
    case RECEIVE_SINGLE_NOTEBOOK:
      notes = action.payload.notes;
      return merge({}, notes);
    case RECEIVE_SINGLE_NOTE:
      return merge({}, state, action.payload.notes);
    case RECEIVE_UPDATED_NOTE:
      newState = merge({}, state);
      updatedNote = Object.values(action.payload.notes)[0];
      delete newState[updatedNote.id];
      return merge({}, newState, action.payload.notes);
    case RECEIVE_ALL_NOTES:
      notes = action.payload.notes;
      return merge({}, notes);
    case REMOVE_NOTE:
      newState = merge({}, state);
      delete newState[action.noteId];
      return newState;
    case RECEIVE_SINGLE_TAG:
      notes = action.payload.notes;
      return merge({}, notes);
    case RECEIVE_UPDATED_TAGGING:
      newState = merge({}, state);
      updatedNote = Object.values(action.payload.notes)[0];
      delete newState[updatedNote.id];
      return merge({}, newState, action.payload.notes);
    default:
      return state;
  }
};

export default notesReducer;