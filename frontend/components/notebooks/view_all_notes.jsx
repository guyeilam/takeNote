import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotebookDetailNote from './notebook_detail_note';
import { connect } from 'react-redux';
import { requestAllNotebooks, requestSingleNotebook } from '../../actions/notebook_actions';
import { setCurrentNote } from '../../actions/note_actions';
import { requestSingleTag } from '../../actions/tag_actions';
import AllNotesTagLabel from './all_notes_tag_label';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import NavModal from '../modal/nav_modal';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.closeTag = this.closeTag.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.tagId) {
      this.props.requestSingleTag(parseInt(this.props.match.params.tagId));
    } else if (this.props.match.params.notebookId) {
      this.props.requestSingleNotebook(parseInt(this.props.match.params.notebookId));
    } else {
      this.props.requestAllNotebooks();
    }
  }

  componentDidUpdate(prevProps) {
    
    if (!this.props.currentNote) {
      if (this.props.notes) {
        if ((this.props.notes.length > 0) && (prevProps.currentNote !== this.props.notes[0].id)) {
          this.props.setCurrentNote(this.props.notes[0].id);
        }
      }
    }
  }
  
  componentWillUnmount() {
    this.props.setCurrentNote(null);
  }

  handleNoteClick(note) {
    return () => {
      this.props.setCurrentNote(null);
      this.props.setCurrentNote(note.id);
    }
  }

  closeTag() {
    this.props.history.push('/notes/all');
  }

  render() {

    if (!(this.props.notes || this.props.notebook)) { return null }
    
    let pageTitle;
    let noteCount;
    
    // Set variables for tag label if viewing a tag
    let tagLabel = null;
    let tagId = this.props.match.params.tagId;
    
    tagLabel = (tagId && this.props.tags[tagId]) ? <AllNotesTagLabel label={this.props.tags[tagId].label} closeTag={() => this.closeTag()}/> : null;
    

    // Set variables for notebook if viewing a notebook
    let notebookId = this.props.match.params.notebookId;
    if (notebookId && this.props.notebook) {
      pageTitle = this.props.notebook.title;
    } else {
      pageTitle = 'All Notes';
    }
    noteCount = this.props.notes.length;

    const noteItems = ((this.props.notes.length > 0) && this.props.notes !== []) ? this.props.notes.map((note) => {
      return (
        <NotebookDetailNote key={note.id} note={note} handleNoteClick={this.handleNoteClick} />
      );
    }) : <div className='empty-notes-message'>
      <div className='empty-notes-subheader'>Create your first note!</div>
      <div className='empty-notes-text'>Click the + New Note button in the sidebar to get started.</div>
      </div>;

    return (
      <div className='notebook-detail-notes'>
        <div className='notebook-detail-notebook-title'>{pageTitle}</div>
        <div className='notes-subheader'>
          <div className='notebook-detail-notes-count'>{noteCount} notes</div>
          <div className='notes-sort-button'>
            <NavModal modalId={null} />
            <div className='notes-sort-button-icon' onClick={() => this.props.openNavModal('notes-sort', null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 16.793l-2.146-2.147-.708.708L8.5 18.707l3.354-3.353-.708-.708L9 16.793V5H8v11.793zM12 5h9v1h-9V5zm0 3h7v1h-7V8zm0 3h5v1h-5v-1z"></path></svg>
            </div>
          </div>
        </div>

        <div className='view-tag-label'>
          {tagLabel}
        </div>
        
        <ul className='notebook-detail-notes-list'>
          {noteItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  let notebookId = parseInt(ownProps.match.params.notebookId);
  let notebook = state.entities.notebooks[notebookId];
  let notes = state.entities.notes;

  let sorted_notes = state.entities.notes ? sortedItems(state.entities.notes, state.ui.sort, notebook) : null;
  
  return ({
    notebook: notebook,
    notes: sorted_notes,
    tags: state.entities.tags,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    requestSingleNotebook: (notebookId) => dispatch(requestSingleNotebook(notebookId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    requestSingleTag: (tagId) => dispatch(requestSingleTag(tagId)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));