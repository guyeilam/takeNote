export const fetchSingleNote = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/notes/${id}`
  });
}

export const fetchAllNotes = () => {
  return $.ajax({
    method: 'get',
    url: `/api/notes`
  });
}

export const fetchAllSharedNotes = () => {
  return $.ajax({
    method: 'get',
    url: `/api/shares`
  });
}

export const createNote = (note) => {
  return $.ajax({
    method: 'post',
    url: '/api/notes',
    data: { note }
  });
}

export const deleteNote = (id) => {
  return $.ajax({
    method: 'delete',
    url: `/api/notes/${id}`
  });
}

export const updateNote = (note) => {
  return $.ajax({
    method: 'patch',
    url: `/api/notes/${note.id}`,
    data: { note }
  });
}

export const createShare = (userEmail, noteId) => {
  return $.ajax({
    method: 'post',
    url: '/api/shares',
    data: { share: { user_email: userEmail, note_id: noteId } }
  });
}

export const deleteShare = (userEmail, noteId) => {
  return $.ajax({
    method: 'delete',
    url: '/api/unshare_note',
    data: { share: { user_email: userEmail, note_id: noteId } }
  });
}