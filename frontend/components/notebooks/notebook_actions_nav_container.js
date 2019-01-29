import { connect } from 'react-redux';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import { deleteNotebookById } from '../../actions/notebook_actions';
import NotebookActionsNav from './notebook_actions_nav';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
    notebookId: ownProps.notebookId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    deleteNotebookById: (notebookId) => dispatch(deleteNotebookById(notebookId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookActionsNav);