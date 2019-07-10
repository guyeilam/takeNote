import * as TagAPIUtil from "../util/tag_api_util";

export const RECEIVE_ALL_TAGS = "RECEIVE_ALL_TAGS";
export const RECEIVE_SINGLE_TAG = "RECEIVE_SINGLE_TAG";
export const RECEIVE_NEW_TAG = "RECEIVE_NEW_TAG";
export const RECEIVE_UPDATED_TAG = "RECEIVE_UPDATED_TAG";
export const RECEIVE_UPDATED_TAGGING = "RECEIVE_UPDATED_TAGGING";
export const REMOVE_TAG = "REMOVE_TAG";
export const RECEIVE_TAG_ERRORS = "RECEIVE_TAG_ERRORS";

export const receiveAllTags = payload => ({
  type: RECEIVE_ALL_TAGS,
  payload
});

export const receiveNewTag = payload => ({
  type: RECEIVE_NEW_TAG,
  payload
});

export const requestAllTags = () => dispatch => {
  return TagAPIUtil.fetchAllTags().then(
    tags => dispatch(receiveAllTags(tags)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const receiveSingleTag = payload => ({
  type: RECEIVE_SINGLE_TAG,
  payload
});

export const receiveUpdatedTag = payload => ({
  type: RECEIVE_UPDATED_TAG,
  payload
});

export const receiveUpdatedTagging = payload => ({
  type: RECEIVE_UPDATED_TAGGING,
  payload
});

export const requestSingleTag = tagId => dispatch => {
  return TagAPIUtil.fetchSingleTag(tagId).then(
    payload => dispatch(receiveSingleTag(payload)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const createTag = tag => dispatch => {
  return TagAPIUtil.createTag(tag).then(
    tag => dispatch(receiveNewTag(tag)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const updateTag = tag => dispatch => {
  return TagAPIUtil.updateTag(tag).then(
    tag => dispatch(receiveUpdatedTag(tag)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const deleteTag = tag => dispatch => {
  return TagAPIUtil.deleteTag(tag.id).then(
    () => dispatch(removeTag(tag)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const receiveTagErrors = errors => ({
  type: RECEIVE_TAG_ERRORS,
  errors
});

export const removeTag = tag => ({
  type: REMOVE_TAG,
  tag
});

export const createTagging = (tagId, noteId) => dispatch => {
  return TagAPIUtil.createTagging(tagId, noteId).then(
    payload => dispatch(receiveUpdatedTagging(payload)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};

export const deleteTagging = (tagId, noteId) => dispatch => {
  return TagAPIUtil.deleteTagging(tagId, noteId).then(
    payload => dispatch(receiveUpdatedTagging(payload)),
    err => dispatch(receiveTagErrors(err.responseJSON))
  );
};
