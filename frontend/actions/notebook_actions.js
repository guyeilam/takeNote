import * as NotebookAPIUtil from "../util/notebook_api_util";

export const RECEIVE_ALL_NOTEBOOKS = "RECEIVE_ALL_NOTEBOOKS";
export const RECEIVE_SINGLE_NOTEBOOK = "RECEIVE_SINGLE_NOTEBOOK";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";
export const RECEIVE_NOTEBOOK_ERRORS = "RECEIVE_NOTEBOOK_ERRORS";
export const RECEIVE_UPDATED_NOTEBOOK = "RECEIVE_UPDATED_NOTEBOOK";
export const REMOVE_NOTE_FROM_NOTEBOOK = "REMOVE_NOTE_FROM_NOTEBOOK";
export const START_LOADING_NOTEBOOKS = "START_LOADING_NOTEBOOKS";

export const loadNotebooks = () => ({
  type: START_LOADING_NOTEBOOKS
});

export const receiveAllNotebooks = payload => ({
  type: RECEIVE_ALL_NOTEBOOKS,
  payload
});

export const requestAllNotebooks = () => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.fetchAllNotebooks().then(
    payload => dispatch(receiveAllNotebooks(payload)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};

export const receiveSingleNotebook = payload => ({
  type: RECEIVE_SINGLE_NOTEBOOK,
  payload
});

export const requestSingleNotebook = notebookId => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.fetchSingleNotebook(notebookId).then(
    payload => dispatch(receiveSingleNotebook(payload)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};

export const receiveUpdatedNotebook = payload => ({
  type: RECEIVE_UPDATED_NOTEBOOK,
  payload
});

export const removeNotebook = notebookId => ({
  type: REMOVE_NOTEBOOK,
  notebookId
});

export const receiveNotebookErrors = errors => ({
  type: RECEIVE_NOTEBOOK_ERRORS,
  errors
});

export const removeNoteFromNotebook = noteId => ({
  type: REMOVE_NOTE_FROM_NOTEBOOK,
  noteId
});

export const updateNotebook = notebook => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.updateNotebook(notebook).then(
    notebook => dispatch(receiveUpdatedNotebook(notebook)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};

export const createNotebook = notebook => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.createNotebook(notebook).then(
    notebook => dispatch(receiveUpdatedNotebook(notebook)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};

export const deleteNotebook = notebook => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.deleteNotebook(notebook.id).then(
    () => dispatch(removeNotebook(notebook.id)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};

export const deleteNotebookById = notebookId => dispatch => {
  dispatch(loadNotebooks());
  return NotebookAPIUtil.deleteNotebook(notebookId).then(
    () => dispatch(removeNotebook(notebookId)),
    err => dispatch(receiveNotebookErrors(err.responseJSON))
  );
};
