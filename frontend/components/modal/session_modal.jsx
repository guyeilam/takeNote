import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeNavModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { getFirstChar } from '../../util/string_util';

class SessionModal extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.closeNavModal();
    this.props.logout();
  }

  render() {
    return (
      <div className='session-modal-content'>

        <div className='session-modal-header'>
          <div className='session-modal-header-text'>Account</div>
          <div className='session-modal-account'>
            <div className='session-modal-icon'><div className='circle-account-icon'>{getFirstChar(this.props.currentUser.email)}</div></div>
            <div className='session-modal-email'><div className='session-modal-email-text'>{this.props.currentUser.email}</div></div>
            <div className='session-modal-checkmark'><i className="fas fa-check"></i></div>
          </div>
        </div>
      
        <div className='hr'></div>

        <div className='left-nav-logout' onClick={() => this.handleLogout()}>
          <div className='left-nav-logout-text'>Sign out {this.props.currentUser.email}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionModal));