import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const SIGNOUT_CURRENT_USER = 'SIGNOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
}

export const logoutCurrentUser = () => {
  return ({
    type: SIGNOUT_CURRENT_USER
  });
}

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });
}

export const clearSessionErrors = () => {
  return ({
    type: CLEAR_SESSION_ERRORS
  });
}

export const login = (user) => {
  return (dispatch) => {
    return APIUtil.login(user).then((user) => {
      return dispatch(receiveCurrentUser(user));
    },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      });
  }
}

export const logout = () => {
  return (dispatch) => {
    return APIUtil.logout().then(() => {
      return dispatch(logoutCurrentUser());
    },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      });
  }
}

export const signup = (user) => {
  return (dispatch) => {
    return APIUtil.signup(user).then((user) => {
      return dispatch(receiveCurrentUser(user));
    },
      (err) => {
        return dispatch(receiveErrors(err.responseJSON));
      });
  }
}