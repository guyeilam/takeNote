import { connect } from 'react-redux';
import { updateTag } from '../../../actions/tag_actions';
import { closeModal } from '../../../actions/modal_actions';
import TagForm from './tag_form';

const mapStateToProps = (state, ownProps) => {
  return {
    // notebookId: state.ui.navModalId,
    errors: state.errors.session,
    formType: 'rename-tag'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (tag) => dispatch(updateTag(tag)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagForm);