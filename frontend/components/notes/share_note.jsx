import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ShareNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createShare(this.state.userEmail, this.props.noteId)
    this.props.closeModal();
  }

  update(field) {
    return e => {
      if (e.currentTarget.value.length > 0) {
        return this.setState({ [field]: e.currentTarget.value, ['disabled']: false });
      } else {
        return this.setState({ [field]: e.currentTarget.value, ['disabled']: true });
      }
    }
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
      <div className='share-note-form-container'>
        <form onSubmit={this.handleSubmit} className="share-note-form">
          <div className='share-note-form-header'>
            <div className='share-note-form-header-text'>Share Note</div>
            <div onClick={this.props.closeModal} className="close-x">X</div>
          </div>
          
          <div className="share-note-form-content">
            <div className='share-note-form-errors'>{this.renderErrors()}</div>
            <label><div className='share-note-form-title-label'>Invite People</div>
              <div className='share-note-form-title-input'>
                <input required id='share-note-user-email' type="text"
                  value={this.state.userEmail}
                  onChange={this.update('userEmail')}
                  className="share-note-form-input"
                  placeholder='Enter Email'
                />
              </div>
            </label>
            <div className='new-notebook-form-buttons'>
              <div onClick={this.props.closeModal} className='white-cancel-button'>Cancel</div>
              <input className="white-new-notebook-continue-button" type="submit" value='Share' disabled={this.state.disabled} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ShareNote);