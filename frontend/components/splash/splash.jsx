import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

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
          <li><Link to='/login'><button className="button-outline">Login</button></Link></li>
        </ul>
      </div>
  );

  return (
    <div className='splash-container'>
      <div className='splash-header'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40">
          <g fill="none">
            <path fill="#00A82D" d="M10.516129,8.93548387 C10.516129,9.32258065 10.483871,9.96774194 10.0967742,10.3870968 C9.67741935,10.7741935 9.03225806,10.8064516 8.64516129,10.8064516 L4.51612903,10.8064516 C3.32258065,10.8064516 2.61290323,10.8064516 2.12903226,10.8709677 C1.87096774,10.9032258 1.5483871,11.0322581 1.38709677,11.0967742 C1.32258065,11.1290323 1.32258065,11.0967742 1.35483871,11.0645161 L10.7741935,1.48387097 C10.8064516,1.4516129 10.8387097,1.4516129 10.8064516,1.51612903 C10.7419355,1.67741935 10.6129032,2 10.5806452,2.25806452 C10.516129,2.74193548 10.516129,3.4516129 10.516129,4.64516129 L10.516129,8.93548387 Z M19.2903226,37.9032258 C18.1935484,37.1935484 17.6129032,36.2580645 17.3870968,35.6774194 C17.1612903,35.1290323 17.0322581,34.516129 17.0322581,33.9032258 C17.0322581,31.2258065 19.2258065,29.0322581 21.9354839,29.0322581 C22.7419355,29.0322581 23.3870968,29.6774194 23.3870968,30.483871 C23.3870968,31.0322581 23.0967742,31.483871 22.6451613,31.7419355 C22.483871,31.8387097 22.2580645,31.9032258 22.0967742,31.9354839 C21.9354839,31.9677419 21.3225806,32.0322581 21.0322581,32.2903226 C20.7096774,32.5483871 20.4516129,32.9677419 20.4516129,33.4193548 C20.4516129,33.9032258 20.6451613,34.3548387 20.9677419,34.6774194 C21.5483871,35.2580645 22.3225806,35.5806452 23.1612903,35.5806452 C25.3548387,35.5806452 27.1290323,33.8064516 27.1290323,31.6129032 C27.1290323,29.6451613 25.8064516,27.9032258 24.0645161,27.1290323 C23.8064516,27 23.3870968,26.9032258 23,26.8064516 C22.516129,26.7096774 22.0645161,26.6451613 22.0322581,26.6451613 C20.6774194,26.483871 17.2903226,25.4193548 17.0645161,22.4193548 C17.0645161,22.4193548 16.0645161,26.9354839 14.0645161,28.1612903 C13.8709677,28.2580645 13.6129032,28.3548387 13.3225806,28.4193548 C13.0322581,28.483871 12.7096774,28.516129 12.6129032,28.516129 C9.35483871,28.7096774 5.90322581,27.6774194 3.51612903,25.2258065 C3.51612903,25.2258065 1.90322581,23.9032258 1.06451613,20.1935484 C0.870967742,19.2903226 0.483870968,17.6774194 0.258064516,16.1612903 C0.161290323,15.6129032 0.129032258,15.1935484 0.0967741935,14.8064516 C0.0967741935,13.2258065 1.06451613,12.1612903 2.29032258,12 C2.32258065,12 2.41935484,12 2.48387097,12 C3.22580645,12 8.87096774,12 8.87096774,12 C10,12 10.6451613,11.7096774 11.0645161,11.3225806 C11.6129032,10.8064516 11.7419355,10.0645161 11.7419355,9.19354839 C11.7419355,9.19354839 11.7419355,3.32258065 11.7419355,2.58064516 C11.7419355,2.5483871 11.7419355,2.41935484 11.7419355,2.38709677 C11.9032258,1.19354839 12.9677419,0.193548387 14.5483871,0.193548387 C14.5483871,0.193548387 15.0322581,0.193548387 15.3225806,0.193548387 C15.6451613,0.193548387 16.0322581,0.225806452 16.3870968,0.258064516 C16.6451613,0.290322581 16.8709677,0.35483871 17.2580645,0.451612903 C19.2258065,0.935483871 19.6451613,2.93548387 19.6451613,2.93548387 C19.6451613,2.93548387 23.3548387,3.58064516 25.2258065,3.90322581 C27,4.22580645 31.3870968,4.51612903 32.2258065,8.93548387 C34.1935484,19.4516129 33,29.6451613 32.9032258,29.6451613 C31.516129,39.5806452 23.2580645,39.0967742 23.2580645,39.0967742 C21.483871,39.0967742 20.1612903,38.516129 19.2903226,37.9032258 Z M26.7096774,16.7741935 C25.6451613,16.6774194 24.7419355,17.0967742 24.4193548,17.9032258 C24.3548387,18.0645161 24.2903226,18.2580645 24.3225806,18.3548387 C24.3548387,18.4516129 24.4193548,18.483871 24.483871,18.516129 C24.8709677,18.7096774 25.516129,18.8064516 26.4516129,18.9032258 C27.3870968,19 28.0322581,19.0645161 28.4516129,19 C28.516129,19 28.5806452,18.9677419 28.6451613,18.8709677 C28.7096774,18.7741935 28.6774194,18.5806452 28.6774194,18.4193548 C28.5483871,17.516129 27.7741935,16.9032258 26.7096774,16.7741935 Z"></path>
          </g>
        </svg>
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
          <Footer />
      </div>
    </div>
  )
}

