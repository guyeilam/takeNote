import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from '../notebooks/view_all_notes';
import { setCurrentNote } from '../../actions/note_actions';
import { requestSingleTag } from '../../actions/tag_actions';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import { setSearchResults, setSearchTerm } from '../../actions/ui_actions';
import { findNotes } from '../../util/search_util';

const mapStateToProps = (state, ownProps) => {
  let notes = state.entities.notes;
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  let searchTerm = state.ui.searchTerm;

  let searchResults = findNotes(notes, searchTerm);

  let sorted_notes = searchResults ? sortedItems(searchResults, state.ui.sort) : null;

  let filteredNotes = [];

  if (sorted_notes && (sorted_notes.length > 0)) {
    sorted_notes.forEach(note => {
      if (note.user_id === currentId) {
        filteredNotes.push(note);
      }
    });
  }

  return ({
    notes: filteredNotes,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal()),
    setSearchResults: noteIds => dispatch(setSearchResults(noteIds)),
    setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllNotes));