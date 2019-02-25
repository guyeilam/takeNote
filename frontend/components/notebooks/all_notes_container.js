import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import { setCurrentNote, requestAllNotes } from '../../actions/note_actions';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  let notes = state.entities.notes;

  let sorted_notes = state.entities.notes ? sortedItems(state.entities.notes, state.ui.sort) : null;

  return ({
    notes: sorted_notes,
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