import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div>
        <h1>{this.props.formType}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input placeholder='email' type='text' value={this.state.email} onChange={this.update('email')} />
          <input placeholder='password' type='password' value={this.state.password} onChange={this.update('password')} />
          <input type='submit' value={this.props.formType} />
        </form>
      </div>
    );
  }
}

export default SessionForm;