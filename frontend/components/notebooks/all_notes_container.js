import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import { setCurrentNote, requestAllNotes } from '../../actions/note_actions';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  let notes = state.entities.notes;
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  let sorted_notes = notes ? sortedItems(notes, state.ui.sort) : null;

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
    requestAllNotes: () => dispatch(requestAllNotes()),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllNotes));