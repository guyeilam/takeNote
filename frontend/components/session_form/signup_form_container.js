import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return ({
    errors: errors.session,
    formType: 'signup'
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    processForm: (user) => dispatch(signup(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);