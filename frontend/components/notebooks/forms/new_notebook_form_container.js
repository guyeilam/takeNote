import { connect } from 'react-redux';
import { createNotebook } from '../../../actions/notebook_actions';
import { closeModal } from '../../../actions/modal_actions';
import NewNotebookForm from './new_notebook_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'new-notebook'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (notebook) => dispatch(createNotebook(notebook)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotebookForm);