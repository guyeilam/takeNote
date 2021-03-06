import merge from 'lodash/merge';

import { RECEIVE_SINGLE_TAG, RECEIVE_ALL_TAGS, REMOVE_TAG, RECEIVE_UPDATED_TAG, RECEIVE_UPDATED_TAGGING, RECEIVE_NEW_TAG } from '../actions/tag_actions';
import { RECEIVE_SINGLE_NOTE } from '../actions/note_actions';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;

  switch (action.type) {
    case RECEIVE_ALL_TAGS:
      newState = action.payload.tags;
      return merge({}, newState);
    case RECEIVE_SINGLE_TAG:
      newState = action.payload.tags;
      return merge({}, state, newState);
    case REMOVE_TAG:
      newState = merge({}, state);
      delete newState[action.tag.id];
      return newState;
    case RECEIVE_UPDATED_TAG:
      newState = action.payload.tags;
      return merge({}, newState);
    case RECEIVE_UPDATED_TAGGING:
      newState = merge({}, state);
      let updatedTag = Object.values(action.payload.tags)[0];
      delete newState[updatedTag.id];
      return merge({}, newState, action.payload.tags);
    case RECEIVE_NEW_TAG:
      newState = action.payload.tags;
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default tagsReducer;