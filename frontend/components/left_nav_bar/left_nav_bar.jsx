import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, openNavModal, closeNavModal, closeModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { createNote, setCurrentNote } from '../../actions/note_actions';
import { getNotebookTitles } from '../../reducers/selectors';
import { findNotebookByTitle } from '../../util/search_util';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentViewNotebooks: '',
      currentViewNotes: '',
      currentViewTags: '',
      inputVal: '',
      disableSearch: false
    }
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.selectTitle = this.selectTitle.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
      const note = Object.assign({}, { title: '', content: '', plain_text: '', notebook_id: this.props.defaultNotebook });
      this.props.createNote(note).then(payload => {
        this.props.setCurrentNote(Object.values(payload.notes)[0].id);
        this.props.history.push(`/notebooks/${this.props.defaultNotebook}`);
      });
    }
  }

  // BEGIN SEARCH

  handleSearch(e, searchTitle) {
      e.preventDefault();
      let notebookId;
      let notebookArray = Object.values(this.props.notebooks);
      notebookArray.forEach(notebook => {

        if (notebook.title === searchTitle) {
          notebookId = notebook.id;
        }
      });
      
    this.props.history.push(`/notebooks/${notebookId}`);
  }

  handleInput(event) {
    this.setState({ inputVal: event.currentTarget.value });
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return null;
    }

    this.props.notebookTitles.forEach(title => {
      const sub = title.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(title);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  }

  selectTitle(event) {
    const title = event.currentTarget.innerText;
    this.setState({ inputVal: title });
  }

  // END AUTOCOMPLETE

  render() {

    // BEGIN SEARCH

    let results;
    let matches = this.matches();

    if (matches) {
      results = this.matches().map((result, i) => {
        return (
          <li key={i} onClick={this.selectTitle}>{result}</li>
        );
      });
    }

    // END SEARCH

    return (
      <>
        <div className='left-navbar-container'>

          <Modal />
        
          <div className='left-navbar-current-user'>
            <div className='left-navbar-user-photo'></div>
            <div className='left-navbar-current-user-email'><button onClick={() => this.props.logout()}>Logout {this.props.currentUser.email}</button></div>
          </div>
          <div className='search-notebooks'>
            <form className='search-form' onSubmit={(e) => this.handleSearch(e, this.state.inputVal)}>
              <input className='search-input' onChange={this.handleInput} value={this.state.inputVal} placeholder='Search...' />
              <div className='search-form-submit-container'>
                <input className='search-submit-button' type='submit' value='search'></input>
              </div>
            <ul>
              {results}
            </ul>
            </form>
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

          <Link to='/tags'>
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
    logout: () => dispatch(logout())
  });
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LeftNavBar));