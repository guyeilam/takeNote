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

  let lowerCaseContent;
  let lowerCaseTitle;

  notesArray.forEach(note => {
    lowerCaseContent = note.plain_text.toLowerCase();
    lowerCaseTitle = note.title.toLowerCase();

    if (lowerCaseContent.includes(searchTerm) || lowerCaseTitle.includes(searchTerm)) {
      searchResults.push(note);
    }
  });

  return searchResults;
}