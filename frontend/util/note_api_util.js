export const fetchSingleNote = (id) => {
  return $.ajax({
    method: 'get',
    url: `/api/notes/${id}`
  });
}