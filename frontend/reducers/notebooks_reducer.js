import merge from 'lodash/merge';

import {
  RECEIVE_ALL_NOTEBOOKS,
  RECEIVE_SINGLE_NOTEBOOK,
  REMOVE_NOTEBOOK,
} from '../actions/notebook_actions';

const notebooksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      return action.notebooks;
    case RECEIVE_SINGLE_NOTEBOOK:
      const newNotebook = action.payload.notebook;
      return merge({}, oldState, newNotebook);
    case REMOVE_NOTEBOOK:
      newState = merge({}, oldState);
      delete newState[action.notebookId];
      return newState;
    default:
      return oldState;
  }
};

export default notebooksReducer;