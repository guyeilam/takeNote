import { connect } from 'react-redux';
import { closeNavModal } from '../../../actions/modal_actions';
import { openModal } from '../../../actions/modal_actions';
import { deleteNotebookById, updateNotebook, requestAllNotebooks } from '../../../actions/notebook_actions';
import { updateDefaultNotebook } from '../../../actions/user_actions';
import NotebookActionsNav from './notebook_actions_nav';

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  return {
    errors: state.errors.session,
    defaultNotebookId: currentUser.default_notebook,
    notebookId: ownProps.notebookId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    openModal: (modal, notebookId) => dispatch(openModal(modal, notebookId)),
    deleteNotebookById: (notebookId) => dispatch(deleteNotebookById(notebookId)),
    updateNotebook: (notebook) => dispatch(updateNotebook(notebook)),
    updateDefaultNotebook: (notebookId) => dispatch(updateDefaultNotebook(notebookId)),
    requestAllNotebooks: () => dispatch(requestAllNotebooks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookActionsNav);