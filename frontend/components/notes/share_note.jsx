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
    this.unshareNote = this.unshareNote.bind(this);
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

  unshareNote(email, noteId) {
    this.props.deleteShare(email, noteId)
    this.props.closeModal();
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

    const note = (this.props.notes && this.props.noteId) ? this.props.notes[this.props.noteId] : null;

    const sharedUsers = (note && note.sharedUserEmails) ? note.sharedUserEmails.map((email, idx) => {
      return (
        <div className='share-note-user-item' key={idx}>
          <div className='share-note-user-email'>{email}</div>
          <div className='unshare-note-outer-icon' onClick={() => this.unshareNote(email, note.id)}>
          <div className='unshare-note-icon'><svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg"><path d="M7.728 6.314l4.95-4.95L11.263-.05 6.313 4.9 1.365-.05-.05 1.364l4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.415-4.95-4.95z" fill="#ccc" fillRule="evenodd"></path></svg></div>
          </div>
        </div>
      );
    }) : null;

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

        <div className='shared-users'>
          <div className='shared-users-title'>Currently Shared With</div>
          <div className='shared-users-list'>
            {sharedUsers}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShareNote);