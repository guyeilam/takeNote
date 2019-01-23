import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formType: props.formType
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    })
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

    if (this.state.formType === 'login') {
      formButton = (<input className='form-button' type='submit' value='Login' />);
      formSwitchText = 'Don\'t have an account?';
      formSwitchLink = (<Link to='/signup'>Create account</Link>);
      formDemoButton = (
        <button className='form-button' onClick={(e) => this.demoLogin(e)}>Demo Login</button>
      );
    } else {
        formButton = (<input className='form-button' type='submit' value='Continue' />);
        formSwitchText = 'Already have an account?';
        formSwitchLink = (<Link to='/login'>Sign in</Link>);
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
              <input className='form-input' placeholder='Email' type='text' value={this.state.email} onChange={this.update('email')} />
              <input className='form-input' placeholder='Password' type='password' value={this.state.password} onChange={this.update('password')} />
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