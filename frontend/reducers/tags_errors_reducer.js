import { RECEIVE_TAG_ERRORS, RECEIVE_ALL_TAGS } from '../actions/tag_actions';

const tagsErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TAG_ERRORS:
      return action.errors;
    case RECEIVE_ALL_TAGS:
      return [];
    default:
      return oldState;
  }
}

export default tagsErrorsReducer;