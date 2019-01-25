import { connect } from 'react-redux';
import NotebookDetail from './notebook_detail';
import { requestSingleNotebook } from '../../actions/notebook_actions';

const mapStateToProps = (state, ownProps) => {
  const notebook = state.entities.notebooks[ownProps.match.params.notebookId];
  return ({
    notebook
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetail);