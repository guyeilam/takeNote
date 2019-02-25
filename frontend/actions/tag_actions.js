import * as TagAPIUtil from '../util/tag_api_util';

export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const RECEIVE_SINGLE_TAG = 'RECEIVE_SINGLE_TAG';
export const RECEIVE_NEW_TAG = 'RECEIVE_NEW_TAG';
export const RECEIVE_UPDATED_TAG = 'RECEIVE_UPDATED_TAG';
export const RECEIVE_UPDATED_TAGGING = 'RECEIVE_UPDATED_TAGGING';
export const REMOVE_TAG = 'REMOVE_TAG';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

export const receiveAllTags = (payload) => {
  return ({
    type: RECEIVE_ALL_TAGS,
    payload
  })
}

export const receiveNewTag = (payload) => {
  return ({
    type: RECEIVE_NEW_TAG,
    payload
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

export const receiveSingleTag = payload => {
  return ({
    type: RECEIVE_SINGLE_TAG,
    payload
  });
}

export const receiveUpdatedTag = payload => {
  return ({
    type: RECEIVE_UPDATED_TAG,
    payload
  });
}

export const receiveUpdatedTagging = payload => {
  return ({
    type: RECEIVE_UPDATED_TAGGING,
    payload
  });
}

export const requestSingleTag = (tagId) => {
  return (dispatch) => {
    return TagAPIUtil.fetchSingleTag(tagId).then((payload) => {
      return dispatch(receiveSingleTag(payload));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}

export const createTag = (tag) => {
  return (dispatch) => {
    return TagAPIUtil.createTag(tag).then((tag) => {
      return dispatch(receiveNewTag(tag));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}

export const updateTag = (tag) => {
  return (dispatch) => {
    return TagAPIUtil.updateTag(tag).then((tag) => {
      return dispatch(receiveUpdatedTag(tag));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}

export const deleteTag = (tag) => {
  return (dispatch) => {
    return TagAPIUtil.deleteTag(tag.id).then(() => {
      return dispatch(removeTag(tag));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}

export const receiveTagErrors = (errors) => {
  return ({
    type: RECEIVE_TAG_ERRORS,
    errors
  });
}

export const removeTag = (tag) => {
  return ({
    type: REMOVE_TAG,
    tag
  });
}

// export const requestTaggings = (tagId) => {
//   return (dispatch) => {
//     return TagAPIUtil.fetchTaggings(tagId).then((tags) => {
//       return dispatch(receiveAllTags(tags));
//     },
//       (err) => {
//         return dispatch(receiveTagErrors(err.responseJSON));
//       });
//   }
// }

export const createTagging = (tagId, noteId) => {
  return (dispatch) => {
    return TagAPIUtil.createTagging(tagId, noteId).then((payload) => {
      return dispatch(receiveUpdatedTagging(payload));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}

export const deleteTagging = (tagId, noteId) => {
  return (dispatch) => {
    return TagAPIUtil.deleteTagging(tagId, noteId).then((payload) => {
      return dispatch(receiveUpdatedTagging(payload));
    },
      (err) => {
        return dispatch(receiveTagErrors(err.responseJSON));
      });
  }
}