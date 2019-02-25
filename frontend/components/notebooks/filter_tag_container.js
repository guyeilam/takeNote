import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import { setCurrentNote } from '../../actions/note_actions';
import { requestSingleTag } from '../../actions/tag_actions';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {

  let tagId = parseInt(ownProps.match.params.tagId);
  let tag = state.entities.tags[tagId];
  let notes = state.entities.notes;

  let filteredNotes = [];

  
  let sortedNotes = notes ? sortedItems(notes, state.ui.sort) : null;

  if (sortedNotes && tag) {
    sortedNotes.forEach(note => {
      if (tag.noteIds.includes(note.id)) {
        filteredNotes.push(note);
      }
    });
  }


  return ({
    tagId,
    tag,
    notes: filteredNotes,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestSingleTag: (tagId) => dispatch(requestSingleTag(tagId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllNotes));