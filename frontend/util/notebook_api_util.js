export const fetchAllNotebooks = () => {
  return $.ajax({
    method: 'get',
    url: '/api/notebooks'
  });
}

export const fetchSingleNotebook = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/notebooks/${id}`
  });
}

export const createNotebook = (notebook) => {
  return $.ajax({
    method: 'post',
    url: '/api/notebooks',
    data: { notebook }
  });
}

export const deleteNotebook = (id) => {
  return $.ajax({
    method: 'delete',
    url: `/api/notebooks/${id}`
  });
}

export const updateNotebook = (notebook) => {
  return $.ajax({
    method: 'patch',
    url: `/api/notebooks/${notebook.id}`,
    data: { notebook }
  });
}