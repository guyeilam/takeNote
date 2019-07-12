import { connect } from "react-redux";
import { createTag } from "../../../actions/tag_actions";
import { closeModal } from "../../../actions/modal_actions";
import TagForm from "./tag_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "new-tag"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: tag => dispatch(createTag(tag)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagForm);
