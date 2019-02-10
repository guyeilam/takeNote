import * as UserAPIUtil from '../util/user_api_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';

// export const UPDATE_DEFAULT_NOTEBOOK = 'UPDATE_DEFAULT_NOTEBOOK';

// export const updateDefaultNotebook = (notebookId) => {
//   return ({
//     type: UPDATE_DEFAULT_NOTEBOOK,
//     notebookId
//   });
// }

export const updateDefaultNotebook = (notebookId) => {
  return (dispatch) => {
    return UserAPIUtil.updateDefaultNotebook(notebookId).then((current_user) => {
      return dispatch(receiveCurrentUser(current_user));
    },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      });
  }
}