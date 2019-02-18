export const fetchAllTags = () => {
  return $.ajax({
    method: 'get',
    url: `/api/tags`
  });
}

export const fetchSingleTag = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/tags/${id}`
  });
}

export const createTag = (tag) => {
  return $.ajax({
    method: 'post',
    url: '/api/tags',
    data: { tag }
  });
}

export const deleteTag = (id) => {
  return $.ajax({
    method: 'delete',
    url: `/api/tags/${id}`
  });
}

export const updateTag = (tag) => {
  return $.ajax({
    method: 'patch',
    url: `/api/tags/${tag.id}`,
    data: { tag }
  });
}

// export const fetchTaggings = (tagId) => {
//   return $.ajax({
//     method: 'get',
//     url: `/api/tags/${tagId}/taggings`
//   });
// }

export const createTagging = (tagId, noteId) => {
  return $.ajax({
    method: 'post',
    url: '/api/taggings',
    data: { tagging: { tag_id: tagId, note_id: noteId } }
  });
}

export const deleteTagging = (tagId, noteId) => {
  return $.ajax({
    method: 'delete',
    url: '/api/remove_tagging',
    data: { tagging: { tag_id: tagId, note_id: noteId } }
  });
}