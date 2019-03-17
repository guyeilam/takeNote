import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { setCurrentNote, createShare } from '../../actions/note_actions';
import ShareNote from './share_note';

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
    createShare: (userEmail, noteId) => dispatch(createShare(userEmail, noteId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareNote);