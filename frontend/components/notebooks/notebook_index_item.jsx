import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import NavModal from '../modal/nav_modal';
import NotebookIndexNote from './notebook_index_note';
import { formatDateTime } from '../../util/datetime_util';
import { requestNotes, deleteNote } from '../../actions/note_actions';
import { requestAllNotebooks, deleteNotebook } from '../../actions/notebook_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import { setCurrentNote } from '../../actions/note_actions';
import { sortedItems } from '../../reducers/selectors';
import { truncateStr } from '../../util/string_util';

class NotebooksIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false
    }
    this.rowSelector = this.rowSelector.bind(this);
    this.requestSpecificNote = this.requestSpecificNote.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleShowNotes = this.handleShowNotes.bind(this);
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
      this.props.setCurrentNote(note.id);
      this.props.history.push('/notes/all');
    }
  }

  handleModalClick(navModalId) {
    return (e) => {
      e.preventDefault();
      this.props.openNavModal('notebook-actions-nav', navModalId);
    }
  }

  handleShowNotes() {
    this.setState({ showNotes: !this.state.showNotes });
    this.props.toggleShowNotes(this.props.notebookId);
  }

  render() {
    const { notebookId, notebook } = this.props
    const arrowIconRight = <svg width="6" height="9" viewBox="2 240 6 9" xmlns="http://www.w3.org/2000/svg" id="notebook-arrow-icon"><path fill="#9B9B9B" fillRule="evenodd" d="M2 240l6 4.5-6 4.5z"></path></svg>
    const arrowIconClass = this.state.showNotes ? 'rotated-90-degrees' : '';

    let hoverOverNotebook = (this.props.hoverOverNotebook === notebookId) ? 'drag-hover' : '';

    return (
      <>
        <div className={`notebooks-index-item-hover ${this.rowSelector(this.props.idx)} ${hoverOverNotebook}`} onDrop={(e) => this.props.drop(e, notebookId)} onDragOver={(e) => this.props.allowDrop(e, notebookId)} onDragLeave={(e) => this.props.leaveDropZone(e, notebookId)}>
          <div className='notebooks-item-col1 col1'>
            <div className={`notebook-item-expand ${arrowIconClass}`}><button onClick={() => this.handleShowNotes()}>{arrowIconRight}</button></div>
            <div className='notebook-item-icon'><svg className='notebook-icon-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 8.33c0-.18-.22-.33-.5-.33h-4c-.28 0-.5.15-.5.33v1.34c0 .18.22.33.5.33h4c.28 0 .5-.15.5-.33zM18 6v11a2 2 0 0 1-2 2H9V4h7a2 2 0 0 1 2 2zM6 4h2v15H6z"></path></svg></div>
            <div className='notebook-item-title'><Link to={`/notebooks/${notebookId}`}>{truncateStr(notebook.title, 30)} ({this.props.notes.length})</Link></div>
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
              <NavModal modalId={notebookId}/>
              <button className='notebook-item-delete-button' onClick={() => this.props.openNavModal('notebook-actions-nav', notebookId)}>
                <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#000" fillRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </div>
        {/* <section className='notebooks-index-item-notes'>
          {noteItems}
        </section> */}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  const notebookId = ownProps.notebookId;
  const notebook = notebookId ? state.entities.notebooks[notebookId] : null;
  
  let allNotes = Object.values(state.entities.notes);
  let notes = [];
  allNotes? allNotes.forEach(note => {
    if (note.notebook_id === notebookId) {
      notes.push(note);
    }
  }) : null;

  let sorted_notes = notes ? sortedItems(notes, state.ui.sort) : null;

  return ({
    notebook,
    notes: sorted_notes,
    currentUserEmail: currentUser.email,
    idx: ownProps.idx,
    toggleShowNotes: ownProps.toggleShowNotes,
    notebookId,
    drop: ownProps.drop,
    allowDrop: ownProps.allowDrop,
    hoverOverNotebook: ownProps.hoverOverNotebook,
    leaveDropZone: ownProps.leaveDropZone
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestNotes: currentNote => dispatch(requestNotes(currentNote)),
    deleteNote: noteId => dispatch(deleteNote(noteId)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndexItem));