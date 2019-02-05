import { connect } from 'react-redux';
import ViewNotebook from './view_notebook';
import { updateNote } from '../../actions/note_actions';
import { withRouter } from 'react-router-dom';
import { createNote, deleteNote } from '../../actions/note_actions';
import { selectNotebookNotes } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  const notebookId = ownProps.match.params.notebookId;
    
  return ({
    notebooks: state.entities.notebooks,
    notes: state.entities.notes,
    notebookId,
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: note => dispatch(createNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId))
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewNotebook));