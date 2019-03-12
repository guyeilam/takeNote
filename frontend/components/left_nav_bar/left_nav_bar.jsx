import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, openNavModal, closeNavModal, closeModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { createNote, setCurrentNote } from '../../actions/note_actions';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { createTagging } from '../../actions/tag_actions';
import { getNotebookTitles } from '../../reducers/selectors';
import LeftNavNotebooks from '../notebooks/left_nav_notebooks';
import NavModal from '../modal/nav_modal';
import LeftNavModal from './left_nav_modal';
import { getFirstChar } from '../../util/string_util';
import { setSearchResults } from '../../actions/ui_actions';
import { setSearchTerm } from '../../actions/ui_actions';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentViewNotebooks: '',
      currentViewNotes: '',
      currentViewTags: '',
      showNotebooks: false,
      searchInput: '',
      disabled: true
    }
    this.handleModalClick = this.handleModalClick.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
  }

  componentDidMount() {
    let currentPath = this.props.match.path;
    if ((currentPath === '/client') || (currentPath === '/notebooks/:notebookId')) {
      this.setState({ currentViewNotebooks: 'current-view' });
    } else if (currentPath === '/notes/all') {
      this.setState({ currentViewNotes: 'current-view' });
    } else if ((currentPath === '/tags') || (currentPath === '/tags/:tagId')) {
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
        if (this.props.match.params.notebookId) {
            this.props.setCurrentNote(Object.values(payload.notes)[0].id);
          } else {
            this.props.history.push(`/notebooks/${notebookId}`);
            this.props.setCurrentNote(Object.values(payload.notes)[0].id);
          }
      });
    }
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.disabled) {
      return null;
    }
    
    let noteIds = Object.keys(this.props.notes);
    
    this.props.setSearchTerm(this.state.searchInput);
    this.props.setSearchResults(noteIds);
    if (this.props.match.path !== '/search') {
      this.props.history.push('/search');
    }
  }

  clearSearchResults() {
    this.setState({ searchInput: '', disabled: true });
    this.props.setSearchTerm(null);
    this.props.setSearchResults(null);
  }

  render() {
    const arrowIconRight = <svg width="6" height="9" viewBox="2 240 6 9" xmlns="http://www.w3.org/2000/svg" id="notebook-arrow-icon"><path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z"></path></svg>
    const arrowIconClass = this.state.showNotebooks ? 'rotated-90-degrees' : '';

    let disabledClass = (this.state.disabled) ? 'disabled-icon' : '';

    return (
      <>
        
        <div className='left-navbar-container'>

          <Modal />
          
          <div className='left-navbar-current-user' onClick={() => this.props.openNavModal('session-modal', null)}>
            <div className='circle-account-icon'>{getFirstChar(this.props.currentUser.email)}</div>
            <div className='left-navbar-current-user-email'>
              <div className='session-actions-nav-button'>{this.props.currentUser.email}</div>
            </div>
            <div className='session-actions-carrot'>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="none" d="M7 2L4 5 1 2"></path></svg>
            </div>
          </div>

          <div className='search-container'>


            <form onSubmit={(e) => this.handleSubmit(e)} className='search-form'>
              <div className='search-form-input-container'>
                <input required id='search-input' type="text"
                  value={this.state.searchInput}
                  onChange={this.update('searchInput')}
                  className="search-input"
                  placeholder='Search all notes...'
                />
                <button>
                  <div className={`search-form-icon ${disabledClass}`}><svg width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M23.394 23.394a.95.95 0 0 1-1.343 0l-3.52-3.519a6.352 6.352 0 0 1-3.792 1.255 6.391 6.391 0 1 1 6.391-6.39c0 1.421-.47 2.73-1.255 3.792l3.52 3.519a.95.95 0 0 1 0 1.343zM9.965 14.713a4.748 4.748 0 1 0 9.496 0 4.748 4.748 0 0 0-9.496 0z"></path></svg></div>
                </button>
              </div>    
            </form>


          </div>

          <div className='left-nav-new-note-button'>
            <div className='create-new-note' onClick={() => this.createNewNote()}>
              <div className='left-nav-new-note-button-container'>
                <div className='left-nav-new-note-button-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" data-event-off="click"><g fill="none" fillRule="evenodd"><path d="M0 0h30v30H0z"></path><circle cx="15" cy="15" r="14" fill="#00A82D"></circle><rect width="14" height="2" x="8" y="14" fill="#FFF" rx="1"></rect><rect width="2" height="14" x="14" y="8" fill="#FFF" rx="1"></rect></g></svg>
                </div>
                <div className='left-nav-new-note-button-text'>New Note</div>
              </div>
            </div>
          </div>
        </div>

      <div className='left-nav-buttons-container'>

        <div className={`left-nav-notes left-nav-hover ${this.state.currentViewNotes}`} onClick={() => this.props.history.push('/notes/all')}>
          <div className='left-nav-notes-expand'></div>
          <div className='left-nav-notes-icon'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M16 16h2v-1h-2a.997.997 0 0 0-1 1v3h1v-3zM8 4h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1.5 4a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3z"></path></svg></div>
          <div className='left-nav-notes-text'>All notes</div>
        </div>

        <div className={`left-nav-notebooks left-nav-hover ${this.state.currentViewNotebooks}`}>
          <div className='left-nav-notebooks-expand'><div className={`notebook-item-expand ${arrowIconClass}`} onClick={() => this.setState({ showNotebooks: !this.state.showNotebooks })}>{arrowIconRight}</div></div>
          <div className='left-nav-notebooks-link' onClick={() => this.props.history.push('/client')}>
            <div className='left-nav-notebooks-icon'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M9 4h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9V4zM6 4h2v15H6V4zm5.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4z"></path></svg></div>
            <div className='left-nav-notebooks-text'>Notebooks</div>
          </div>
        </div>

        <div className='notebooks-expanded-container'>
          <LeftNavNotebooks showNotebooks={this.state.showNotebooks} />
        </div>

        <div className={`left-nav-tags left-nav-hover ${this.state.currentViewTags}`} onClick={() => this.props.history.push('/tags')}>
          <div className='left-nav-tags-expand'></div>
          <div className='left-nav-tags-icon'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" fillRule="evenodd" d="M10.265 9.005a2 2 0 1 0 3.47 0H18v9.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-9.5h4.265zM9.5 16a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0-2a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm4.235-4.995H18l-4.982-4.606a1.5 1.5 0 0 0-2.036 0L6 9.005h4.265a2 2 0 0 1 3.47 0z"></path></svg></div>
          <div className='left-nav-tags-text'>Tags</div>
        </div>
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
    notebooks,
    notes: state.entities.notes
  });
}

const mapDispatchToProps = dispatch => {
  return({
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal()),
    createNote: note => dispatch(createNote(note)),
    setCurrentNote: noteId => dispatch(setCurrentNote(noteId)),
    logout: () => dispatch(logout()),
    createTagging: (tagId, noteId) => dispatch(createTagging(tagId, noteId)),
    requestSingleNotebook: notebookId => dispatch(requestSingleNotebook(notebookId)),
    setSearchResults: noteIds => dispatch(setSearchResults(noteIds)),
    setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm))
  });
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LeftNavBar));