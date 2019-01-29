import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, openNavModal, closeNavModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import NavModal from '../modal/nav_modal';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleModalClick() {
    return (e) => {
      e.preventDefault();
      this.props.openNavModal('notebook-actions-nav');
    }
  }

  render() {
    return (
      <>
      <div className='left-navbar-container'>
        <Modal />
        <div className='left-navbar-current-user'>
          <div className='left-navbar-user-photo'></div>
            <div className='left-navbar-current-user-email'><button onClick={() => this.props.logout()}>Logout {this.props.currentUser.email}</button></div>
        </div>
        {/* <NavModal /> */}
        <div className='left-nav-new-note-button'>
          <button onClick={() => this.props.openModal('new-notebook')}>
            <div className='left-nav-new-note-button-container'>
              <div className='left-nav-new-note-button-icon'>
                <i className="fas fa-plus-circle"></i>
              </div>
              <div className='left-nav-new-note-button-text'>New Note</div>
            </div>
          </button>
        </div>
        </div>
      <div className='left-nav-buttons-container'>
        <div className='left-nav-all-notes'>
            <div className='left-nav-all-notes-icon'>
              <i className="far fa-sticky-note"></i>
            </div>
            <div className='left-nav-all-notes-text'>
              All notes
            </div>
        </div>
        <Link to='/client'>
        <div className='left-nav-notebooks'>
          <div className='left-nav-notebooks-icon'>
              <i className="fas fa-book"></i>
          </div>
          <div className='left-nav-notebooks-text'>
            Notebooks
          </div>
        </div>
        </Link>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  return({
    currentUser
  });
}

const mapDispatchToProps = dispatch => {
  return({
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: navModal => dispatch(openNavModal(navModal)),
    closeNavModal: () => dispatch(closeNavModal()),
    logout: () => dispatch(logout())
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(LeftNavBar);