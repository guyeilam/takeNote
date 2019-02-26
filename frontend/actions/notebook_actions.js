import * as NotebookAPIUtil from '../util/notebook_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_ALL_NOTEBOOKS = 'RECEIVE_ALL_NOTEBOOKS';
export const RECEIVE_SINGLE_NOTEBOOK = 'RECEIVE_SINGLE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_NOTEBOOK_ERRORS = 'RECEIVE_NOTEBOOK_ERRORS';
export const RECEIVE_UPDATED_NOTEBOOK = 'RECEIVE_UPDATED_NOTEBOOK';
export const REMOVE_NOTE_FROM_NOTEBOOK = 'REMOVE_NOTE_FROM_NOTEBOOK';


export const receiveAllNotebooks = (payload) => {
  return ({
    type: RECEIVE_ALL_NOTEBOOKS,
    payload
  });
}

export const requestAllNotebooks = () => {
  return (dispatch) => {
    dispatch(startLoading());
    return NotebookAPIUtil.fetchAllNotebooks().then( (payload) => {
      return dispatch(receiveAllNotebooks(payload));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const receiveSingleNotebook = (payload) => {
  return ({
    type: RECEIVE_SINGLE_NOTEBOOK,
    payload
  });
}


export const requestSingleNotebook = (notebookId) => {
  return (dispatch) => {
    return NotebookAPIUtil.fetchSingleNotebook(notebookId).then((payload) => {
        dispatch(receiveSingleNotebook(payload));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}


export const receiveUpdatedNotebook = (payload) => {
  return ({
    type: RECEIVE_UPDATED_NOTEBOOK,
    payload
  });
}

export const removeNotebook = (notebookId) => {
  return ({
    type: REMOVE_NOTEBOOK,
    notebookId
  });
}

export const receiveNotebookErrors = (errors) => {
  return ({
    type: RECEIVE_NOTEBOOK_ERRORS,
    errors
  });
}

export const removeNoteFromNotebook = (noteId) => {
  return ({
    type: REMOVE_NOTE_FROM_NOTEBOOK,
    noteId
  });
}



export const updateNotebook = (notebook) => {
  return (dispatch) => {
    return NotebookAPIUtil.updateNotebook(notebook).then((notebook) => {
      return dispatch(receiveUpdatedNotebook(notebook));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const createNotebook = (notebook) => {
  return (dispatch) => {
    return NotebookAPIUtil.createNotebook(notebook).then((notebook) => {
      return dispatch(receiveUpdatedNotebook(notebook));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const deleteNotebook = (notebook) => {
  return (dispatch) => {
    return NotebookAPIUtil.deleteNotebook(notebook.id).then(() => {
      return dispatch(removeNotebook(notebook.id));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const deleteNotebookById = (notebookId) => {
  return (dispatch) => {
    return NotebookAPIUtil.deleteNotebook(notebookId).then(() => {
      return dispatch(removeNotebook(notebookId));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

