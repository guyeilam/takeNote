export const findNotebookByTitle = (notebooks, title) => {
  notebooks.forEach(notebook => {
    if (notebook.title === title) {
      return notebook.id;
    }
  });
}

export const findNotes = (notes, searchTerm) => {
  let searchResults = [];
  let notesArray = Object.keys(notes).map(id => notes[id]);

  notesArray.forEach(note => {
    if (note.plain_text.includes(searchTerm) || note.title.includes(searchTerm)) {
      searchResults.push(note);
    }
  });

  return searchResults;
}