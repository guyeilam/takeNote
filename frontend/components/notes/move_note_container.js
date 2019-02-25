import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { updateNote, setCurrentNote } from '../../actions/note_actions';
import MoveNote from './move_note';

const mapStateToProps = (state, ownProps) => {
  return {
    noteId: state.ui.navModalId,
    notes: state.entities.notes,
    notebooks: state.entities.notebooks,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    updateNote: (note) => dispatch(updateNote(note)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveNote);