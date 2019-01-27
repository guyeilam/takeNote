export const selectAllNotebooks = state => Object.values(state.entities.notebooks);

// export const selectSingleNotebook = (state, notebookId) => {
//   return state.entities.notebooks[notebookId];
// }

export const selectNotebookNotes = (state, notebook) => {
  return notebook ? notebook.noteIds.map(id => state.entities.notes[id]) : [];
};

export const selectNotebookNote = (state, id) => {
  return state.entities.notes[id];
};