import merge from 'lodash/merge';

import {
  RECEIVE_ALL_NOTEBOOKS,
  RECEIVE_SINGLE_NOTEBOOK,
  REMOVE_NOTEBOOK,
  RECEIVE_UPDATED_NOTEBOOK,
} from '../actions/notebook_actions';
import { REMOVE_NOTE } from '../actions/note_actions';

const notebooksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  let newNotebook;
  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:  
      newState = action.payload.notebooks;
      return newState;
    case RECEIVE_SINGLE_NOTEBOOK:  
      return action.payload.notebooks;
    case RECEIVE_UPDATED_NOTEBOOK:
      newNotebook = Object.values(action.payload.notebooks)[0];
      return merge({}, oldState, { [newNotebook.id]: newNotebook });
    case REMOVE_NOTEBOOK:
      newState = merge({}, oldState);
      delete newState[action.notebookId];
      return newState;
    // case REMOVE_NOTE_FROM_NOTEBOOK:
    //   newState = merge({}, oldState);
    //   delete Object.values(newState)[0].noteIds[Object.values(newState)[0].noteIds.indexOf(5159)];
    //   debugger
    //   return newState;
    default:
      return oldState;
  }
};

export default notebooksReducer;