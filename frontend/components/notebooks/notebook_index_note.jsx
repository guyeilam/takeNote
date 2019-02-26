import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavModal from '../modal/nav_modal';
import { openNavModal } from '../../actions/modal_actions';
import { formatDateTime } from '../../util/datetime_util';
import { setCurrentNote } from '../../actions/note_actions';
import { withRouter } from 'react-router-dom';
import { truncateStr } from '../../util/string_util';

class NotebookIndexNote extends Component {
  constructor(props) {
    super(props);
    this.openNote = this.openNote.bind(this);
  }

  openNote(noteId) {
    this.props.setCurrentNote(noteId);
    this.props.history.push('/notes/all');
  }

  render() {
    if (!this.props.note) { return null; }

    const note = this.props.note;

    return (
      <div className={`notebooks-index-item-hover ${this.props.rowSelector(this.props.idx)}`}>
        <div className='notebooks-item-col1 col1'>
          <div className='notebook-item-notes-detail-title-icon-note'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fillRule="nonzero" d="M8 5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8zm8 11h1v-1h-1a.997.997 0 0 0-1 1v2h1v-2zM8 4h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1.5 4a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3z"></path></svg>  
          </div>
          <button onClick={() => this.openNote(note.id)}><div className='notebook-item-notes-detail-title-text'>{truncateStr(note.title, 30)}</div></button>
        </div>

        <div className='notebooks-item-col2 col2'>
          <div className='notebook-item-created-by'>- </div>
        </div>

        <div className='notebooks-item-col3 col3'>
          <div className='notebook-item-updated'>{formatDateTime(note)}</div>
        </div>

        <div className='notebooks-item-col4 col4'>
          <div className='notebook-item-shared-with'>- </div>
        </div>

        <div className='notebooks-item-col5 col5'>
          <div className='notebook-item-actions'>
            <NavModal modalId={note.id} />
            <div className='note-actions-icon' onClick={() => this.props.openNavModal('note-header-nav', note.id)}><svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-9 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#000" fillRule="evenodd"></path></svg></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  return ({
    note: ownProps.note,
    rowSelector: ownProps.rowSelector,
    idx: ownProps.idx
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    setCurrentNote: noteId => dispatch(setCurrentNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookIndexNote));