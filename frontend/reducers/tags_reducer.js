import merge from 'lodash/merge';

import { RECEIVE_SINGLE_TAG, RECEIVE_ALL_TAGS } from '../actions/tag_actions';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;

  switch (action.type) {
    case RECEIVE_ALL_TAGS:
      return action.tags;
    case RECEIVE_SINGLE_TAG:
      newState = action.tag;
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default tagsReducer;