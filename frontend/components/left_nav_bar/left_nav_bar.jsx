import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, openNavModal, closeNavModal, closeModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { createNote, setCurrentNote } from '../../actions/note_actions';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { createTagging } from '../../actions/tag_actions';
import { getNotebookTitles } from '../../reducers/selectors';
import LeftNavNotebooks from '../notebooks/left_nav_notebooks';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentViewNotebooks: '',
      currentViewNotes: '',
      currentViewTags: '',
      showNotebooks: false
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
    let notebookId = this.props.match.params.notebookId ? parseInt(this.props.match.params.notebookId) : this.props.defaultNotebook;
    const note = Object.assign({}, { title: '', content: '', plain_text: '', notebook_id: notebookId });
    const tagId = parseInt(this.props.match.params.tagId);
    
    if (tagId) {
      this.props.createNote(note).then(payload => {
        this.props.createTagging(tagId, Object.values(payload.notes)[0].id).then(() => this.props.setCurrentNote(Object.values(payload.notes)[0].id));
      });
    } else {
      this.props.createNote(note).then(payload => {
        // this.props.setCurrentNote(Object.values(payload.notes)[0].id);
        if (this.props.match.params.notebookId) {
            this.props.requestSingleNotebook(parseInt(notebookId)).then(() => this.props.setCurrentNote(Object.values(payload.notes)[0].id));
          } else {
            this.props.history.push(`/notebooks/${notebookId}`);
            this.props.setCurrentNote(Object.values(payload.notes)[0].id);
          }
      });
    }
  }

  render() {
    const arrowIconRight = <svg width="6" height="9" viewBox="2 240 6 9" xmlns="http://www.w3.org/2000/svg" id="notebook-arrow-icon"><path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z"></path></svg>
    const arrowIconClass = this.state.showNotebooks ? 'rotated-90-degrees' : '';

    return (
      <>
        <div className='left-navbar-container'>

          <Modal />
        
          <div className='left-navbar-current-user'>
            <div className='left-navbar-user-photo'></div>
            <div className='left-navbar-current-user-email'><button onClick={() => this.props.logout()}>Logout {this.props.currentUser.email}</button></div>
          </div>

          <div className='left-nav-new-note-button'>
            <button onClick={() => this.createNewNote()}>
              <div className='left-nav-new-note-button-container'>
                <div className='left-nav-new-note-button-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" data-event-off="click"><g fill="none" fillRule="evenodd"><path d="M0 0h30v30H0z"></path><circle cx="15" cy="15" r="14" fill="#00A82D"></circle><rect width="14" height="2" x="8" y="14" fill="#FFF" rx="1"></rect><rect width="2" height="14" x="14" y="8" fill="#FFF" rx="1"></rect></g></svg>
                </div>
                <div className='left-nav-new-note-button-text'>New Note</div>
              </div>
            </button>
          </div>
        </div>

      <div className='left-nav-buttons-container'>

          <Link to='/notes/all'>
            <div className={`left-nav-all-notes ${this.state.currentViewNotes}`}>
              <div className='left-nav-notes-button-container'>  
                <div className='left-nav-all-notes-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M16 16h2v-1h-2a.997.997 0 0 0-1 1v3h1v-3zM8 4h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1.5 4a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3z"></path></svg>
                </div>
                <div className='left-nav-all-notes-text'>All notes</div>
              </div>
            </div>
          </Link>

          <div className='left-nav-notebooks-list'>
            <div className='left-nav-notebooks-list-icon'>
              <div className={`notebook-item-expand ${arrowIconClass}`} onClick={() => this.setState({ showNotebooks: !this.state.showNotebooks })}>{arrowIconRight}</div>
            </div>
            <Link to='/client'>
              <div className={`left-nav-notebooks ${this.state.currentViewNotebooks}`}>
                <div className='left-nav-notebooks-button-container'>
                  <div className='left-nav-notebooks-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M9 4h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9V4zM6 4h2v15H6V4zm5.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4z"></path></svg>
                  </div>
                  <div className='left-nav-notebooks-text'>Notebooks</div>
                </div>
              </div>
            </Link>
            <LeftNavNotebooks showNotebooks={this.state.showNotebooks}/>
          </div>

          <Link to='/tags'>
            <div className={`left-nav-tags ${this.state.currentViewTags}`}>
              <div className='left-nav-tags-button-container'>
                <div className='left-nav-tags-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M10.265 9.005a2 2 0 1 0 3.47 0H18v9.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-9.5h4.265zM9.5 16a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0-2a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm4.235-4.995H18l-4.982-4.606a1.5 1.5 0 0 0-2.036 0L6 9.005h4.265a2 2 0 0 1 3.47 0z"></path></svg>
                </div>
                <div className='left-nav-tags-text'>Tags</div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  let notebooks;
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  if (Object.values(state.entities.notebooks).length > 0) {
    notebooks = Object.values(state.entities.notebooks);
  } else {
    notebooks = Object.values(state.entities.notes);
  }
  const notebookTitles = getNotebookTitles(notebooks);

  return({
    currentUser,
    defaultNotebook: currentUser.default_notebook,
    notebookTitles,
    notebooks
  });
}

const mapDispatchToProps = dispatch => {
  return({
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: navModal => dispatch(openNavModal(navModal)),
    closeNavModal: () => dispatch(closeNavModal()),
    createNote: note => dispatch(createNote(note)),
    setCurrentNote: noteId => dispatch(setCurrentNote(noteId)),
    logout: () => dispatch(logout()),
    createTagging: (tagId, noteId) => dispatch(createTagging(tagId, noteId)),
    requestSingleNotebook: notebookId => dispatch(requestSingleNotebook(notebookId))
  });
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LeftNavBar));