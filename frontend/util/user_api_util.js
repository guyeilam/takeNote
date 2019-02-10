export const updateDefaultNotebook = (notebookId) => {
  return $.ajax({
    method: 'patch',
    url: '/api/user',
    data: { default_notebook: notebookId }
  });
}