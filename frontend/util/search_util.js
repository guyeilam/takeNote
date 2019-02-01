export const findNotebookByTitle = (notebooks, title) => {
  notebooks.forEach(notebook => {
    if (notebook.title === title) {
      return notebook.id;
    }
  });
}