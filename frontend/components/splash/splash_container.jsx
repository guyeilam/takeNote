import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Splash from './splash';

const mapStateToProps = (state) => {

  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  return ({
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: () => dispatch(logout())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);