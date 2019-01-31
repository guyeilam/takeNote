import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, openNavModal, closeNavModal, closeModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { createNote, setCurrentNote } from '../../actions/note_actions';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentViewNotebooks: '',
      currentViewNotes: '',
      currentViewTags: ''
    }
    this.handleModalClick = this.handleModalClick.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === '/client') {
      this.setState({ currentViewNotebooks: 'current-view' });
    } else if (this.props.match.path === '/notes/all') {
      this.setState({ currentViewNotes: 'current-view' });
    } else if (this.props.match.path === '/tags') {
      this.setState({ currentViewTags: 'current-view' });
    }
  }

  handleModalClick() {
    return (e) => {
      e.preventDefault();
      this.props.openNavModal('notebook-actions-nav');
    }
  }

  createNewNote() {
    return (e) => {
      const note = Object.assign({}, { title: '', content: '' });
      this.props.createNote(note).then(this.props.history.push('/notes/all'));
    }
  }

  render() {
    return (
      <>
        <div className='left-navbar-container'>

          <Modal />
        
          <div className='left-navbar-current-user'>
            <div className='left-navbar-user-photo'></div>
            <div className='left-navbar-current-user-email'><button onClick={() => this.props.logout()}>Logout {this.props.currentUser.email}</button></div>
          </div>

          <div className='left-nav-new-note-button'>
            <button onClick={this.createNewNote()}>
              <div className='left-nav-new-note-button-container'>
                <div className='left-nav-new-note-button-icon'><i className="fas fa-plus-circle"></i></div>
                <div className='left-nav-new-note-button-text'>New Note</div>
              </div>
            </button>
          </div>
        </div>

      <div className='left-nav-buttons-container'>

          <Link to='/notes/all'>
            <div className={`left-nav-all-notes ${this.state.currentViewNotes}`}>
              <div className='left-nav-all-notes-icon'>
                <i className="far fa-sticky-note"></i>
              </div>
              <div className='left-nav-all-notes-text'>
                All notes
              </div>
            </div>
          </Link>
        
          <Link to='/client'>
            <div className={`left-nav-notebooks ${this.state.currentViewNotebooks}`}>
              <div className='left-nav-notebooks-icon'><i className="fas fa-book"></i></div>
              <div className='left-nav-notebooks-text'>Notebooks</div>
            </div>
          </Link>

          <Link to='/client'>
            <div className={`left-nav-tags ${this.state.currentViewTags}`}>
              <div className='left-nav-tags-icon'><i className="fas fa-tag"></i></div>
              <div className='left-nav-tags-text'>Tags</div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  return({
    currentUser
  });
}

const mapDispatchToProps = dispatch => {
  return({
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: navModal => dispatch(openNavModal(navModal)),
    closeNavModal: () => dispatch(closeNavModal()),
    createNote: note => dispatch(createNote(note)),
    setCurrentNote: noteId => dispatch(setCurrentNote(noteId)),
    logout: () => dispatch(logout())
  });
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LeftNavBar));