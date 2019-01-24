import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import { login, signup, logout } from './actions/session_actions';
// import { fetchAllNotebooks, fetchSingleNotebook, createNotebook, deleteNotebook, updateNotebook } from './util/notebook_api_util';
import { requestAllNotebooks, requestSingleNotebook } from './actions/notebook_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // BEGIN TESTING
  // window.login = login;
  // window.signup = signup;
  // window.logout = logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.requestAllNotebooks = requestAllNotebooks;
  window.requestSingleNotebook = requestSingleNotebook;
  // window.fetchAllNotebooks = fetchAllNotebooks;
  // window.fetchSingleNotebook = fetchSingleNotebook;
  // window.deleteNotebook = deleteNotebook;
  // window.createNotebook = createNotebook;
  // window.updateNotebook = updateNotebook;
  // END TESTING

  ReactDOM.render(<Root store={store} />, root);
});