import { RECEIVE_NOTEBOOK_ERRORS, RECEIVE_SINGLE_NOTEBOOK } from '../actions/notebook_actions';

const notebooksErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_NOTEBOOK_ERRORS:
      return action.errors;
    case RECEIVE_SINGLE_NOTEBOOK:
      return [];
    default:
      return oldState;
  }
}

export default notebooksErrorsReducer;