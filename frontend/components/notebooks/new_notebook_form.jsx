import React from 'react';
import { withRouter } from 'react-router-dom';

class NewNotebookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="new-notebook-form-container">
        <form onSubmit={this.handleSubmit} className="new-notebook-form">
          <div className='new-notebook-form-header'>
            <div className='new-notebook-form-header-text'>Create new notebook</div>
            <div onClick={this.props.closeModal} className="close-x">X</div>
          </div>
          <div className='new-notebbook-form-text'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
          <div className="new-notebook-form-content">
            <div className='new-notebook-form-errors'>{this.renderErrors()}</div>
            <label>Username:
                <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <div class='new-notebook-form-buttons'>
              <button onClick={this.props.closeModal} className='white-cancel-button'>Cancel</button>
              <input className="white-new-notebook-continue-button" type="submit" value='Continue' />
            </div>
          </div>
         </form>
      </div>
    );
  }
}

export default withRouter(NewNotebookForm);