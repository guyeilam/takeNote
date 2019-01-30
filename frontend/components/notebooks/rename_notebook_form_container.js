import { connect } from 'react-redux';
import { updateNotebook } from '../../actions/notebook_actions';
import { closeModal } from '../../actions/modal_actions';
import NewNotebookForm from './new_notebook_form';

const mapStateToProps = (state, ownProps) => {
  return {
    notebookId: state.ui.navModalId,
    errors: state.errors.session,
    formType: 'rename-notebook'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (notebook) => dispatch(updateNotebook(notebook)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotebookForm);