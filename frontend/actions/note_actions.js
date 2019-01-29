import * as NoteAPIUtil from '../util/note_api_util';

export const RECEIVE_SINGLE_NOTE = 'RECEIVE_SINGLE_NOTE';


export const receiveSingleNote = (payload) => {
  return ({
    type: RECEIVE_SINGLE_NOTE,
    payload
  });
}

export const requestSingleNote = (noteId) => {
  return (dispatch) => {
    return NoteAPIUtil.fetchSingleNote(noteId).then((payload) => {
      return dispatch(receiveSingleNote(payload));
    // },
    //   (err) => {
    //     return dispatch(receiveNoteErrors(err.responseJSON));
      });
  }
}

export const updateNote = (note) => {
  return (dispatch) => {
    return NoteAPIUtil.updateNote(note).then((note) => {
      return dispatch(receiveSingleNote(note));
    // },
    //   (err) => {
    //     return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}