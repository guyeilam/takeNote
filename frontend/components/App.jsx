import React from 'react';
import SplashContainer from './splash/splash_container';
import SessionForm from '../components/session_form/session_form';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ClientContainer from './client/client';

const App = () => (
  <div className='main'>
    {/* Splash page route (user not logged in) */}
    <AuthRoute exact path="/" component={SplashContainer} />
    
    {/* Auth routes (user not logged in) */}
    <AuthRoute path="/login" component={SessionForm} />
    <AuthRoute path="/signup" component={SessionForm} />
    
    {/* Main app routes (user is logged in) */}
    <ProtectedRoute exact path="/client" component={ClientContainer} />
    <ProtectedRoute exact path="/notes/all" component={ClientContainer} />
    <ProtectedRoute exact path="/notebooks/:notebookId" component={ClientContainer} />
    <ProtectedRoute exact path="/tags" component={ClientContainer} />
    <ProtectedRoute exact path="/tags/:tagId" component={ClientContainer} />
    <ProtectedRoute exact path="/search" component={ClientContainer} />
    <ProtectedRoute exact path="/shared_notes" component={ClientContainer} />
  </div>
);

export default App;