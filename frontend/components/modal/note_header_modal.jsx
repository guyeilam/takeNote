import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { deleteTagging, requestSingleTag } from '../../actions/tag_actions';
import { requestSingleNote, requestAllNotes, deleteNote } from '../../actions/note_actions';
import { removeNoteFromNotebook } from '../../actions/notebook_actions';
import { request } from 'http';

class NoteHeaderModal extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleDeleteNote(noteId) {
    // return (e) => {
    this.props.deleteNote(noteId).then(() => this.props.removeNoteFromNotebook(noteId));
    // }
  }

  render() {
    return (
      <>
        <div className='note-header-nav-text'>
          <div className='notes-nav-button'>
            <div className='notes-nav-button-text' onClick={() => this.handleDeleteNote(this.props.currentNote)}>Delete note...</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navModalId: state.ui.navModalId,
    currentNote: state.ui.currentNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    removeNoteFromNotebook: noteId => dispatch(removeNoteFromNotebook(noteId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteHeaderModal));