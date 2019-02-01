import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hidePasswordInput: '',
      formType: props.formType
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  update(field) {
    if (field === 'email') {
      return (e) => {
        if (e.currentTarget.value.length > 0) {
          return this.setState({ [field]: e.currentTarget.value, ['hidePasswordInput']: 'loaded form-input' });
        } else {
          return this.setState({ [field]: e.currentTarget.value, ['hidePasswordInput']: '' });
        }
      }
    } else {
      return (e) => {
        return this.setState({ [field]: e.currentTarget.value });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  demoLogin(e) {
    e.preventDefault();
    const user = Object.assign({}, {email: 'demo@demo', password: 'password'});
    this.props.processForm(user);
  }

  renderErrors() {
    return (
      <ul className='form-errors'>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let formButton;
    let formSwitchText;
    let formSwitchLink;
    let formDemoButton;
    let passwordInputTransition;

    if (this.state.formType === 'login') {
      formButton = (<input className='form-button' type='submit' value='Login' />);
      formSwitchText = 'Don\'t have an account?';
      formSwitchLink = (<Link to='/signup'>Create account</Link>);
      passwordInputTransition = 'password-input-transition';
      formDemoButton = (
        <button className='form-button' onClick={(e) => this.demoLogin(e)}>Demo Login</button>
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
          {this.renderErrors()}
          <div className='form-content'>
            <form className='signup-form' onSubmit={(e) => this.handleSubmit(e)}>
              <input className='form-input' required id='email' placeholder='Email' type='text' value={this.state.email} onChange={this.update('email')} />
              <input className={`${passwordInputTransition} ${this.state.hidePasswordInput}`} required id='password' placeholder='Password' type='password' value={this.state.password} onChange={this.update('password')} />
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
      </div>
    );
  }
}

export default SessionForm;