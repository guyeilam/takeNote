import React from 'react';
import SplashContainer from './splash/splash_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ClientContainer from '../components/notebooks/client';

const App = () => (
  <div className='main'>
    <AuthRoute exact path="/" component={SplashContainer} />
    <ProtectedRoute exact path="/client" component={ClientContainer} />
    <ProtectedRoute exact path="/notes/all" component={ClientContainer} />
    <ProtectedRoute exact path="/notebooks/:notebookId" component={ClientContainer} />
    <ProtectedRoute exact path="/tags" component={ClientContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
 
 
  </div>
);

export default App;