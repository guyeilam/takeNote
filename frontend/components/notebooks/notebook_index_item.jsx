import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import NavModal from '../modal/nav_modal';
import NotebookIndexNote from './notebook_index_note';
import { formatDateTime } from '../../util/datetime_util';
import { requestNotes, deleteNote } from '../../actions/note_actions';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

class NotebooksIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false
    }
    this.rowSelector = this.rowSelector.bind(this);
    this.requestSpecificNote = this.requestSpecificNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  rowSelector(idx) {
    if (idx % 2 === 0) {
      return 'even-row';
    } else {
      return 'odd-row';
    }
  }

  requestSpecificNote(note) {
    return (e) => {
      this.props.requestNotes(note).then(this.props.history.push('/notes/all'));
    }
  }

  handleDeleteNote(noteId) {
    return (e) => {
      this.props.deleteNote(noteId).then(() => this.props.requestAllNotebooks());
    }
  }

  render() {
    const { notebook, deleteNotebook, openActionsModal } = this.props;

    const arrowIconRight = <svg width="6" height="9" viewBox="2 240 6 9" xmlns="http://www.w3.org/2000/svg" id="notebook-arrow-icon"><path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z"></path></svg>
    // const arrowIconDown = <svg width="6" height="9" viewBox="2 240 6 9" xmlns="http://www.w3.org/2000/svg" id="qa-SPACE_VIEW_EXPAND_ICON"><path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z"></path></svg>;
    const arrowIconClass = this.state.showNotes ? 'rotated-90-degrees' : '';
    
    // const noteTitles = notebook.noteIds.map(id => this.props.notes[id]);
    const noteItems = this.state.showNotes ? this.props.notes.map((note, idx) => {
      return (
        <NotebookIndexNote key={idx} idx={this.props.idx+idx+1} note={note} rowSelector={this.rowSelector} requestNotes={this.requestSpecificNote} deleteNote={this.handleDeleteNote}/>
      ); }) : null;
    
    return (
      <>
        <div className={`notebooks-index-item-hover ${this.rowSelector(this.props.idx)}`}>
          <div className='notebooks-item-col1 col1'>
            <div className={`notebook-item-expand ${arrowIconClass}`}><button onClick={() => this.setState({ showNotes: !this.state.showNotes })}>{arrowIconRight}</button></div>
            <div className='notebook-item-icon'><svg className='notebook-icon-svg' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><path className="cls-1" d="M16 8.33c0-.18-.22-.33-.5-.33h-4c-.28 0-.5.15-.5.33v1.34c0 .18.22.33.5.33h4c.28 0 .5-.15.5-.33zM18 6v11a2 2 0 0 1-2 2H9V4h7a2 2 0 0 1 2 2zM6 4h2v15H6z"></path></svg></div>
            <div className='notebook-item-title'><Link to={`/notebooks/${notebook.id}`}>{notebook.title} ({this.props.notes ? notebook.noteIds.length : '0'})</Link></div>
          </div>
          
          <div className='notebooks-item-col2 col2'>
            <div className='notebook-item-created-by'>{this.props.currentUserEmail}</div>
          </div>
          
          <div className='notebooks-item-col3 col3'>
            <div className='notebook-item-updated'>{formatDateTime(notebook)}</div>
          </div>
          
          <div className='notebooks-item-col4 col4'>
            <div className='notebook-item-shared-with'>- </div>
          </div>

          <div className='notebooks-item-col5 col5'>
            <div className='notebook-item-actions'>
              <NavModal modalId={notebook.id}/>
              {/* <button className='notebook-item-delete-button' onClick={openActionsModal(notebook.id)}> */}
              <button className='notebook-item-delete-button' onClick={() => this.props.openNavModal('notebook-actions-nav', notebook.id)}>
                <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#000" fillRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <section className='notebooks-index-item-notes'>
          {noteItems}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  const notebook = ownProps.notebook ? state.entities.notebooks[ownProps.notebook.id] : null;
  // const notes = notebook.noteIds ? notebook.noteIds.map(noteId => state.entities.notes[noteId]) : null;
  
  let sorted_notes = () => {
    let notes = notebook.noteIds ? notebook.noteIds.map(noteId => state.entities.notes[noteId]) : null;

    return notes.sort(function (a, b) {
      a = new Date(a.updated_at);
      b = new Date(b.updated_at);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  return ({
    notebook,
    notes: sorted_notes(),
    currentUserEmail: currentUser.email,
    deleteNotebook: ownProps.deleteNotebook,
    idx: ownProps.idx
    // openActionsModal: ownProps.openActionsModal
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestNotes: currentNote => dispatch(requestNotes(currentNote)),
    deleteNote: noteId => dispatch(deleteNote(noteId)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndexItem));