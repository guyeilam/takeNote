import { connect } from 'react-redux';
import { closeNavModal } from '../../actions/modal_actions';
import { openModal } from '../../actions/modal_actions';
import { deleteNotebookById, updateNotebook } from '../../actions/notebook_actions';
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
    openModal: (modal, notebookId) => dispatch(openModal(modal, notebookId)),
    deleteNotebookById: (notebookId) => dispatch(deleteNotebookById(notebookId)),
    updateNotebook: (notebook) => dispatch(updateNotebook(notebook))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookActionsNav);