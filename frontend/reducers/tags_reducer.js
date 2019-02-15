import merge from 'lodash/merge';

import { RECEIVE_SINGLE_TAG, RECEIVE_ALL_TAGS, REMOVE_TAG } from '../actions/tag_actions';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;

  switch (action.type) {
    case RECEIVE_ALL_TAGS:
      return action.payload.tags;
    case RECEIVE_SINGLE_TAG:
      newState = action.payload.tags;
      return merge({}, state, newState);
    case REMOVE_TAG:
      newState = merge({}, state);
      delete newState[action.tag.id];
      return newState;
    default:
      return state;
  }
};

export default tagsReducer;