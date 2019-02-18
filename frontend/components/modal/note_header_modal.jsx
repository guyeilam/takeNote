import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { deleteTagging, requestSingleTag } from '../../actions/tag_actions';
import { requestSingleNote, requestAllNotes } from '../../actions/note_actions';

class NoteHeaderModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='note-header-nav-text'>
          <div className='notes-nav-button'>
            <div className='notes-nav-button-text'>Button text</div>
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

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteHeaderModal));