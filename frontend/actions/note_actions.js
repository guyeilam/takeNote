import * as NoteAPIUtil from '../util/note_api_util';

export const RECEIVE_SINGLE_NOTE = 'RECEIVE_SINGLE_NOTE';
export const RECEIVE_UPDATED_NOTE = 'RECEIVE_UPDATED_NOTE';
export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const SET_CURRENT_NOTE = 'SET_CURRENT_NOTE';
export const START_LOADING_NOTES = 'START_LOADING_NOTES';

export const loadNotes = () => {
  return ({
    type: START_LOADING_NOTES
  });
}

export const receiveAllNotes = (payload) => {
  return ({
    type: RECEIVE_ALL_NOTES,
    payload
  });
}

export const requestAllNotes = () => {
  return (dispatch) => {
    dispatch(loadNotes());
    return NoteAPIUtil.fetchAllNotes().then((payload) => {
        return dispatch(receiveAllNotes(payload));
      },
        (err) => {
          return dispatch(receiveNoteErrors(err.responseJSON));
    });
  }
}

export const requestAllSharedNotes = () => {
  return (dispatch) => {
    dispatch(loadNotes());
    return NoteAPIUtil.fetchAllSharedNotes().then((payload) => {
        return dispatch(receiveAllNotes(payload));
      },
        (err) => {
          return dispatch(receiveNoteErrors(err.responseJSON));
    });
  }
}

export const removeNote = (noteId) => {
  return ({
    type: REMOVE_NOTE,
    noteId
  });
}

export const deleteNote = (noteId) => {
  return (dispatch) => {
    return NoteAPIUtil.deleteNote(noteId).then(() => {
      return dispatch(removeNote(noteId));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}








export const receiveSingleNote = (payload) => {
  return ({
    type: RECEIVE_SINGLE_NOTE,
    payload
  });
}

export const receiveUpdatedNote = (payload) => {
  return ({
    type: RECEIVE_UPDATED_NOTE,
    payload
  });
}

export const receiveNoteErrors = (errors) => {
  return ({
    type: RECEIVE_NOTE_ERRORS,
    errors
  });
}

export const requestSingleNote = (noteId) => {
  return (dispatch) => {
    dispatch(loadNotes());
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
    dispatch(loadNotes());
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
    dispatch(loadNotes());
    return NoteAPIUtil.createNote(note).then((note) => {
      dispatch(receiveSingleNote(note));
      return note;
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

export const setCurrentNote = (noteId) => {
  return ({
    type: SET_CURRENT_NOTE,
    noteId
  })
}

export const createShare = (userEmail, noteId) => {
  return (dispatch) => {
    return NoteAPIUtil.createShare(userEmail, noteId).then((payload) => {
      return dispatch(receiveSingleNote(payload));
    },
      (err) => {
        return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}