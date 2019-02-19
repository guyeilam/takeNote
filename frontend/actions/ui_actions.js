export const SET_SORT = 'SET_SORT';

export const setSort = (sortMethod) => {
  return {
    type: SET_SORT,
    sortMethod
  };
};