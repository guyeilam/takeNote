import { connect } from 'react-redux';
import NotebookDetail from './notebook_detail';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { updateNote } from '../../actions/note_actions';
import { requestAllNotes } from '../../actions/note_actions';
import { withRouter } from 'react-router-dom';
import { createNote, deleteNote } from '../../actions/note_actions';

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  let showAllNotes = false;
  const notebookId = ownProps.match.params.notebookId;

  if (ownProps.match.path === '/notes/all') {
    showAllNotes = true;
  }
  
  return ({
    notebooks: state.entities.notebooks,
    notes: Object.values(state.entities.notes),
    currentUser,
    showAllNotes,
    notebookId,
    currentNote: state.ui.currentNote
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id)),
    requestAllNotes: () => dispatch(requestAllNotes()),
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: note => dispatch(createNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookDetail));