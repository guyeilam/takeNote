import { connect } from 'react-redux';
import NotebookDetail from './notebook_detail';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { updateNote } from '../../actions/note_actions';
import { selectSingleNotebook, selectNotebookNotes } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  const showAllNotes = false;
  if (ownProps.allNotebooks === 'all') {
    showAllNotes = true;
  }
  return ({
    notebooks: state.entities.notebooks,
    notes: Object.values(state.entities.notes),
    currentUser,
    showAllNotes
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id)),
    updateNote: (note) => dispatch(updateNote(note))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetail);