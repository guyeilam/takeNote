import * as TagAPIUtil from '../util/tag_api_util';

export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const RECEIVE_SINGLE_TAG = 'RECEIVE_SINGLE_TAG';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

export const receiveAllTags = (tags) => {
  return ({
    type: RECEIVE_ALL_TAGS,
    tags
  })
}

export const requestAllTags = () => {
  return (dispatch) => {
    return TagAPIUtil.fetchAllTags().then((tags) => {
      return dispatch(receiveAllTags(tags));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
    });
  }
}

