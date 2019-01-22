import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  if (props.currentUser) {
    return (
      <div>
        <h2>Welcome {props.currentUser.email}</h2>
        <button onClick={() => props.logout()}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p><Link to='/signup'>Sign up</Link></p>
        <p><Link to='/login'>Login</Link></p>
      </div>
    );
  }
}
