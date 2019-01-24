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
          <li className="or-text">or</li>
          <li className="button-outline"><Link to='/login'>Login</Link></li>
        </ul>
      </div>
  );

  return (
    <div className='splash-container'>
      <div className='splash-header'>
        <div className='header-logo'></div>
        <div className='header-logo-text'>takeNote</div>
        <div className='auth-buttons'>{authButtons}</div>
      </div>
      <div className='splash-content-1'>
        <div className='splash-content-container'>
          <div className='splash-content-text'>
            <div className='splash-content-text-header'>
              Feel organized without the effort
            </div>
            <div className='splash-content-text-subheader'>
              takeNote helps you capture and prioritize ideas, projects, and to-do lists, so nothing falls through the cracks.
            </div>
            <div className='hero-button'>
              <Link to='/signup'>
                <button className='hero-button-white'>Sign Up For Free</button>
              </Link>
            </div>
          </div>
          <div className='splash-content-image'>
            <img className='splash-image' src='https://evernote.com/c/assets/homepage/homepage-hero-desktop.png?4268157aec35510e' />
          </div>
        </div>
      </div>
      <div className='splash-footer'>
        <div className='splash-footer-container'>
          <div className='splash-footer-text'>
            © 2019 takeNote. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

