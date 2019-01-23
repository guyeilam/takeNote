import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return ({
    errors: errors.session,
    formType: 'login'
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    processForm: (user) => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);