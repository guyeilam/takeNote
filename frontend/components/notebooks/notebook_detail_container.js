import { connect } from 'react-redux';
import NotebookDetail from './notebook_detail';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { selectSingleNotebook, selectNotebookNotes } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  return ({
    notebook: state.entities.notebooks,
    notes: Object.values(state.entities.notes),
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetail);