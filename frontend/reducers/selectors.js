export const selectAllNotebooks = state => Object.values(state.entities.notebooks);

// export const selectSingleNotebook = (state, notebookId) => {
//   return state.entities.notebooks[notebookId];
// }

export const selectNotebookNotes = (state, notebook) => {
  return (notebook && (notebook.noteIds.length > 0)) ? notebook.noteIds.map(id => state.entities.notes[id]) : [];
};

export const selectNotebookNote = (state, id) => {
  return state.entities.notes[id];
};

export const getNotebookTitles = (notebooks) => {
  return notebooks.map(notebook => notebook.title);
}

export const sortedItems = (items, sortMethod) => {
  let sortBy = sortMethod;
  let itemsArr;
  
  itemsArr = Object.keys(items).map(id => items[id]);
    
  switch (sortBy) {
    case 'title_ascending':
      return itemsArr.sort(function (a, b) {
        a = a.title.substring(0, 1).toLowerCase();
        b = b.title.substring(0, 1).toLowerCase();
        return a > b ? 1 : a < b ? -1 : 0;
      });
    case 'title_descending':
      return itemsArr.sort(function (a, b) {
        a = a.title.substring(0, 1).toLowerCase();
        b = b.title.substring(0, 1).toLowerCase();
        return a > b ? -1 : a < b ? 1 : 0;
      });
    case 'updated_date_ascending':
      return itemsArr.sort(function (a, b) {
        a = new Date(a.updated_at);
        b = new Date(b.updated_at);
        return a > b ? 1 : a < b ? -1 : 0;
      });
    case 'updated_date_descending':
      return itemsArr.sort(function (a, b) {
        a = new Date(a.updated_at);
        b = new Date(b.updated_at);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    case 'created_date_descending':
      return itemsArr.sort(function (a, b) {
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    case 'created_date_ascending':
      return itemsArr.sort(function (a, b) {
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a > b ? 1 : a < b ? -1 : 0;
      });
    default:
      // return notebooksArr.sort(function (a, b) {
      //   a = new Date(a.updated_at);
      //   b = new Date(b.updated_at);
      //   return a > b ? -1 : a < b ? 1 : 0;
      // });
      return itemsArr.sort(function (a, b) {
        a = new Date(a.updated_at);
        b = new Date(b.updated_at);
        return a > b ? -1 : a < b ? 1 : 0;
      });
  }
}