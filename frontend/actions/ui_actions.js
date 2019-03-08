export const SET_SORT = 'SET_SORT';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const setSort = (sortMethod) => {
  return {
    type: SET_SORT,
    sortMethod
  };
};

export const setSearchResults = (noteIds) => {
  return {
    type: SET_SEARCH_RESULTS,
    noteIds
  };
}

export const setSearchTerm = (searchTerm) => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  };
}