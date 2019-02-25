import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewAllNotes from './view_all_notes';
import { requestAllNotebooks, requestSingleNotebook } from '../../actions/notebook_actions';
import { setCurrentNote } from '../../actions/note_actions';
import { requestSingleTag } from '../../actions/tag_actions';
import { sortedItems } from '../../reducers/selectors';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {

  let notebookId = parseInt(ownProps.match.params.notebookId);
  let notebook = state.entities.notebooks[notebookId];
  let notes = state.entities.notes;

  let sorted_notes = notes ? sortedItems(notes, state.ui.sort) : null;

  return ({
    notebookId,
    notebook,
    notes: sorted_notes,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestSingleNotebook: (notebookId) => dispatch(requestSingleNotebook(notebookId)),
    setCurrentNote: (noteId) => dispatch(setCurrentNote(noteId)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAllNotes));