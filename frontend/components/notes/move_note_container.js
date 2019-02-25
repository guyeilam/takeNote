import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import MoveNote from './move_note';

const mapStateToProps = (state, ownProps) => {
  return {
    noteId: state.ui.navModalId,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveNote);