export const selectAllNotebooks = state => Object.values(state.entities.notebooks);

export const selectNotebooksNotes = (state, notebook) => {
  return notebook ? notebook.note_ids.map(id => state.entities.notes[id]) : [];
};

export const selectNotebookNote = (state, id) => {
  return state.entities.notes[id];
};