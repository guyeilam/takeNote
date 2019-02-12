export const updateDefaultNotebook = (notebookId) => {
  return $.ajax({
    method: 'patch',
    url: '/api/user',
    data: { user: { default_notebook: notebookId } }
  });
}