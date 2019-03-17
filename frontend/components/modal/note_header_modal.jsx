import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { deleteTagging, requestSingleTag } from '../../actions/tag_actions';
import { requestSingleNote, requestAllNotes, deleteNote, setCurrentNote } from '../../actions/note_actions';
import { removeNoteFromNotebook } from '../../actions/notebook_actions';
import { openModal } from '../../actions/modal_actions';

class NoteHeaderModal extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.moveNoteModal = this.moveNoteModal.bind(this);
    this.shareNoteModal = this.shareNoteModal.bind(this);
  }

  handleDeleteNote(noteId) {
    // return (e) => {
    this.props.deleteNote(noteId).then(() => this.props.setCurrentNote(null));
    // }
  }

  moveNoteModal() {
    this.props.closeNavModal();
    this.props.openModal('move-note', this.props.navModalId);
  }

  shareNoteModal() {
    this.props.closeNavModal();
    this.props.openModal('share-note', this.props.navModalId);
  }

  render() {
    return (
      <>
        <div className='note-header-nav-text'>
          <div className='notes-nav-delete-note notes-nav-button'><div className='notes-nav-button-text' onClick={() => this.handleDeleteNote(this.props.navModalId)}>Delete note...</div></div>
          <div className='notes-nav-move-note notes-nav-button'><div className='notes-nav-button-text' onClick={() => this.moveNoteModal()}>Move note</div></div>
          <div className='notes-nav-move-note notes-nav-button'><div className='notes-nav-button-text' onClick={() => this.shareNoteModal()}>Share note</div></div>
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
    removeNoteFromNotebook: noteId => dispatch(removeNoteFromNotebook(noteId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    openModal: (modal, noteId) => dispatch(openModal(modal, noteId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteHeaderModal));