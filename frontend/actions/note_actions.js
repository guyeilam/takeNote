import * as NoteAPIUtil from "../util/note_api_util";

export const RECEIVE_SINGLE_NOTE = "RECEIVE_SINGLE_NOTE";
export const RECEIVE_UPDATED_NOTE = "RECEIVE_UPDATED_NOTE";
export const RECEIVE_ALL_NOTES = "RECEIVE_ALL_NOTES";
export const RECEIVE_NOTE_ERRORS = "RECEIVE_NOTE_ERRORS";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const SET_CURRENT_NOTE = "SET_CURRENT_NOTE";
export const START_LOADING_NOTES = "START_LOADING_NOTES";

export const loadNotes = () => ({
  type: START_LOADING_NOTES
});

export const receiveAllNotes = payload => ({
  type: RECEIVE_ALL_NOTES,
  payload
});

export const requestAllNotes = () => dispatch => {
  dispatch(loadNotes());
  return NoteAPIUtil.fetchAllNotes().then(
    payload => dispatch(receiveAllNotes(payload)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

export const requestAllSharedNotes = () => dispatch => {
  dispatch(loadNotes());
  return NoteAPIUtil.fetchAllSharedNotes().then(
    payload => dispatch(receiveAllNotes(payload)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

export const removeNote = noteId => ({
  type: REMOVE_NOTE,
  noteId
});

export const deleteNote = noteId => dispatch => {
  return NoteAPIUtil.deleteNote(noteId).then(
    () => dispatch(removeNote(noteId)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

export const receiveSingleNote = payload => {
  return {
    type: RECEIVE_SINGLE_NOTE,
    payload
  };
};

export const receiveUpdatedNote = payload => {
  return {
    type: RECEIVE_UPDATED_NOTE,
    payload
  };
};

export const receiveNoteErrors = errors => {
  return {
    type: RECEIVE_NOTE_ERRORS,
    errors
  };
};

export const requestSingleNote = noteId => dispatch => {
  dispatch(loadNotes());
  return NoteAPIUtil.fetchSingleNote(noteId).then(
    payload => dispatch(receiveSingleNote(payload)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

export const updateNote = note => dispatch => {
  dispatch(loadNotes());
  return NoteAPIUtil.updateNote(note).then(
    note => dispatch(receiveSingleNote(note)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

export const createNote = note => dispatch => {
  dispatch(loadNotes());
  return NoteAPIUtil.createNote(note).then(
    note => {
      dispatch(receiveSingleNote(note));
      return note;
    },
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};

// export const requestNotes = currentNote => {
//   return dispatch => {
//     return NoteAPIUtil.fetchAllNotes().then(
//       notes => {
//         return dispatch(setCurrentNote(notes, currentNote));
//       },
//       err => {
//         return dispatch(receiveNoteErrors(err.responseJSON));
//       }
//     );
//   };
// };

export const setCurrentNote = noteId => ({
  type: SET_CURRENT_NOTE,
  noteId
});

export const createShare = (userEmail, noteId) => dispatch => {
  return NoteAPIUtil.createShare(userEmail, noteId).then(
    payload => dispatch(receiveUpdatedNote(payload)),
    err => dispatch(receiveNoteErrors(err.responseText))
  );
};

export const deleteShare = (userEmail, noteId) => dispatch => {
  return NoteAPIUtil.deleteShare(userEmail, noteId).then(
    payload => dispatch(receiveUpdatedNote(payload)),
    err => dispatch(receiveNoteErrors(err.responseJSON))
  );
};
