import * as NotebookAPIUtil from '../util/notebook_api_util';

export const RECEIVE_ALL_NOTEBOOKS = 'RECEIVE_ALL_NOTEBOOKS';
export const RECEIVE_SINGLE_NOTEBOOK = 'RECEIVE_SINGLE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_NOTEBOOK_ERRORS = 'RECEIVE_NOTEBOOK_ERRORS';
export const SORT_NOTEBOOKS_TOGGLE = 'SORT_NOTEBOOKS_TOGGLE';

export const receiveAllNotebooks = (notebooks) => {
  return ({
    type: RECEIVE_ALL_NOTEBOOKS,
    notebooks
  });
}

export const receiveSingleNotebook = (payload) => {
  return ({
    type: RECEIVE_SINGLE_NOTEBOOK,
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

export const requestAllNotebooks = () => {
  return (dispatch) => {
    return NotebookAPIUtil.fetchAllNotebooks().then( (notebooks) => {
      return dispatch(receiveAllNotebooks(notebooks));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const requestSingleNotebook = (notebookId) => {
  return (dispatch) => {
    return NotebookAPIUtil.fetchSingleNotebook(notebookId).then((payload) => {
      return dispatch(receiveSingleNotebook(payload));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const updateNotebook = (notebook) => {
  return (dispatch) => {
    return NotebookAPIUtil.updateNotebook(notebook).then((notebook) => {
      return dispatch(receiveSingleNotebook(notebook));
    },
      (err) => {
        return dispatch(receiveNotebookErrors(err.responseJSON));
      });
  }
}

export const createNotebook = (notebook) => {
  return (dispatch) => {
    return NotebookAPIUtil.createNotebook(notebook).then((notebook) => {
      return dispatch(receiveSingleNotebook(notebook));
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

export const sortToggle = (sortOption) => {
  return ({
    type: SORT_NOTEBOOKS_TOGGLE,
    sort: sortOption
  })
}