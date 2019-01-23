import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  const authButtons = props.currentUser ? (
    <div class='auth-buttons'>
      <h2>Welcome {props.currentUser.email}</h2>
      <button onClick={() => props.logout()}>Logout</button>
    </div>
  ) : (
      <div class='auth-links'>
        <ul>
          <li class="button"><Link to='/signup'>Sign up</Link></li>
          <li>or</li>
          <li class="button button-outline"><Link to='/login'>Login</Link></li>
        </ul>
      </div>
  );

  return (
    <div class="row">
      <div class="header-logo">
        <h1>takeNote</h1>
      </div>
      <div class="header-nav">
        Nav Bar
      </div>
      <div class='auth-buttons'>
        {authButtons}
      </div>
    </div>
  )
}

