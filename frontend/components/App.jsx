import React from 'react';
import SplashContainer from './splash/splash_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import NotebooksIndexContainer from '../components/notebooks/notebooks_index_container';
import NotebookDetailContainer from '../components/notebooks/notebook_detail_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div className='main'>
    <Route exact path="/" component={SplashContainer} />
    <ProtectedRoute exact path="/client" component={NotebooksIndexContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />

    <Route
      path="/notebooks/:notebookId"
      component={NotebookDetailContainer}
    />
  </div>
);

export default App;