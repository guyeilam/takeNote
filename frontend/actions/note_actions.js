import * as NoteAPIUtil from '../util/note_api_util';

export const RECEIVE_SINGLE_NOTE = 'RECEIVE_SINGLE_NOTE';
export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const SET_CURRENT_NOTE = 'SET_CURRENT_NOTE';

export const receiveSingleNote = (payload) => {
  return ({
    type: RECEIVE_SINGLE_NOTE,
    payload
  });
}

export const receiveAllNotes = (notes) => {
  return ({
    type: RECEIVE_ALL_NOTES,
    notes: notes.notes
  });
}

export const receiveNoteErrors = (errors) => {
  return ({
    type: RECEIVE_NOTE_ERRORS,
    errors
  });
}

export const requestAllNotes = () => {
  return (dispatch) => {
    return NoteAPIUtil.fetchAllNotes().then((notes) => {
      return dispatch(receiveAllNotes(notes));
      },
        (err) => {
          return dispatch(receiveNoteErrors(err.responseJSON));
    });
  }
}

export const requestSingleNote = (noteId) => {
  return (dispatch) => {
    return NoteAPIUtil.fetchSingleNote(noteId).then((payload) => {
      return dispatch(receiveSingleNote(payload));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}

export const updateNote = (note) => {
  return (dispatch) => {
    return NoteAPIUtil.updateNote(note).then((note) => {
      return dispatch(receiveSingleNote(note));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}

export const createNote = (note) => {
  return (dispatch) => {
    return NoteAPIUtil.createNote(note).then((note) => {
      return dispatch(receiveSingleNote(note));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}

export const requestNotes = (currentNote) => {
  return (dispatch) => {
    return NoteAPIUtil.fetchAllNotes().then((notes) => {
      return dispatch(setCurrentNote(notes, currentNote));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}

export const setCurrentNote = (notes, currentNote) => {
  return ({
    type: SET_CURRENT_NOTE,
    payload: notes,
    currentNote
  })
}