import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { deleteTagging, requestSingleTag } from '../../actions/tag_actions';
import { requestSingleNote, requestAllNotes, setCurrentNote } from '../../actions/note_actions';

class TaggingModal extends Component {
  constructor(props) {
    super(props);
    this.filterByTag = this.filterByTag.bind(this);
    this.handleRemoveTagging = this.handleRemoveTagging.bind(this);
  }

  filterByTag() {
    let newTagId = parseInt(this.props.match.params.tagId);
    if (this.props.tagId === newTagId) { 
      this.props.closeNavModal();
    } else {
      this.props.closeNavModal();
      this.props.history.push(`/tags/${this.props.tagId}`);
    }
  }

  handleRemoveTagging() {
    let tagId = this.props.navModalId;
    let noteId = this.props.currentNote;
    this.props.closeNavModal();
    this.props.deleteTagging(tagId, noteId);
    this.props.setCurrentNote(null);
    // .then(() => {
      // if (this.props.match.params.tagId) {
      //   this.props.requestSingleTag(tagId);
      // } else {
      //   this.props.requestSingleNote(this.props.currentNote);
      //   // this.props.requestAllNotes();
      // }
    // });
  }

  render() {
    return (
      <>
        <div className='tag-actions-nav-text'>
          <div className='tagging-filter-by-tag'><div className='taggings-modal-button-text' onClick={() => this.filterByTag()}>Filter by Tag</div></div>
          <div className='tagging-remove'><div className='taggings-modal-button-text' onClick={() => this.handleRemoveTagging()}>Remove</div></div>
          {/* <div className='tagging-hr'></div> */}
          {/* <div className='tagging-remove-from-all'><div className='taggings-modal-button-text'>Delete from All Notes</div></div> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tagId: ownProps.tagId,
    navModalId: state.ui.navModalId,
    currentNote: state.ui.currentNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    deleteTagging: (tagId, noteId) => dispatch(deleteTagging(tagId, noteId)),
    requestSingleTag: tagId => dispatch(requestSingleTag(tagId)),
    requestSingleNote: noteId => dispatch(requestSingleNote(noteId)),
    requestAllNotes: () => dispatch(requestAllNotes()),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaggingModal));