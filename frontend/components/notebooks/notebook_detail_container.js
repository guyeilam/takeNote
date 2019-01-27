import { connect } from 'react-redux';
import NotebookDetail from './notebook_detail';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { selectSingleNotebook, selectNotebookNotes } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  // const notebook = selectSingleNotebook(ownProps.match.params.notebookId);
  const notebook = state.entities.notebooks[ownProps.match.params.notebookId];
  // const notes = selectNotebookNotes(state, notebook);
  // const notes = selectNotebookNotes(state, notebook);
  return ({
    notebook,
    notes: state.entities.notes
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetail);