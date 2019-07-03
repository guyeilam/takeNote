import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../splash/footer';
import { signup, login, clearSessionErrors } from '../../actions/session_actions';

const SessionForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePasswordInput, setHidePasswordInput] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector(state => {
    return state.errors.session || [];
  });

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    }
  }, []);

  const updateEmail = () => {
    return (e) => {
      if (e.currentTarget.value.length > 0) {
        setEmail(e.currentTarget.value);
        setHidePasswordInput('loaded form-input');
      } else {
          setEmail(e.currentTarget.value);
          setHidePasswordInput('');
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = Object.assign({}, {email: email, password: password});
    if (props.match.path === '/login') {
      dispatch(login(user));
    } else {
      dispatch(signup(user));
    }
  }

  const demoLogin = (e) => {
    const user = Object.assign({}, {email: 'demo@demo', password: 'password'});
    dispatch(login(user));
  }

  const renderErrors = () => {
    return (
      <ul className='form-errors'>
        {errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  let formButton;
  let formSwitchText;
  let formSwitchLink;
  let formDemoButton;
  let passwordInputTransition;

  if (props.match.path === '/login') {
    formButton = (<input className='form-button' type='submit' value='Login' />);
    formSwitchText = 'Don\'t have an account?';
    formSwitchLink = (<Link to='/signup'>Create account</Link>);
    passwordInputTransition = 'password-input-transition';
    formDemoButton = (
      <button className='form-button' onClick={() => demoLogin()}>Demo Login</button>
    );
  } else {
      formButton = (<input className='form-button' type='submit' value='Continue' />);
      formSwitchText = 'Already have an account?';
      formSwitchLink = (<Link to='/login'>Sign in</Link>);
      passwordInputTransition = 'form-input';
  }
  
  return (
    <div className='form-main'>
      <div className='form-frame'>
        <div className='form-heading'>
          <p className='form-logo-image'></p>
          <p className='form-logo'>takeNote</p>
          <p className='form-tagline'>Remember everything important.</p>
        </div>
        <hr />
        {renderErrors()}
        <div className='form-content'>
          <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
            <input className='form-input' required id='email' placeholder='Email' type='text' value={email} onChange={updateEmail()} />
            <input className={`${passwordInputTransition} ${hidePasswordInput}`} required id='password' placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <>
              {formButton}
            </>
            <>
              {formDemoButton}
            </>
          </form>
        </div>
        <div className='form-switch'>
          <p className='form-switch-text'>{formSwitchText}</p>
          <button className='button'>{formSwitchLink}</button>
        </div>
      </div>

    <Footer />

    </div>
  );
}

export default SessionForm;