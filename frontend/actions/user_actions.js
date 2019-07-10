import * as UserAPIUtil from "../util/user_api_util";
import { receiveCurrentUser, receiveErrors } from "./session_actions";

export const updateDefaultNotebook = notebookId => dispatch => {
  return UserAPIUtil.updateDefaultNotebook(notebookId).then(
    current_user => dispatch(receiveCurrentUser(current_user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};
