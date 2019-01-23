import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  const authButtons = props.currentUser ? (
    <div className='auth-buttons'>
      <h2>Welcome {props.currentUser.email}</h2>
      <button onClick={() => props.logout()}>Logout</button>
    </div>
  ) : (
      <div className='auth-links'>
        <ul>
          <li className="button"><Link to='/signup'>Sign up</Link></li>
          <li>or</li>
          <li className="button-outline"><Link to='/login'>Login</Link></li>
        </ul>
      </div>
  );

  return (
    <div className="row">
      <div className="header-logo">
        <h1>takeNote</h1>
      </div>
      <div className="header-nav">
        Nav Bar
      </div>
      <div className='auth-buttons'>
        {authButtons}
      </div>
    </div>
  )
}

