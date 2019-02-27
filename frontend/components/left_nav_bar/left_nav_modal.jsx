import React, { Component } from 'react';
import { closeNavModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SessionModalContainer from '../modal/session_modal';

class LeftNavModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navModal = this.props.navModal;
    const closeNavModal = this.props.closeNavModal;
    const navModalId = this.props.navModalId;
    const idx = this.props.idx;

    if (!navModal) {
      return null;
    }

    let component;
    let parentClass;
    let childClass;

    switch (navModal) {
      case 'session-modal':
        component = <SessionModalContainer modalId={null} />;
        parentClass = 'session-modal-nav';
        childClass = 'session-modal-nav-child';
        break;
      default:
        return null;
    }

    if (idx === navModalId) {
      return (
        <>
          <div className={parentClass} onClick={closeNavModal}>
            <div className={childClass} onClick={e => e.stopPropagation()}>
              {component}
            </div>
          </div>
          <div className='navbar-modal-background' onClick={closeNavModal}></div>
        </>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navModal: state.ui.navModal,
    navModalId: state.ui.navModalId,
    idx: ownProps.modalId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavModal: () => dispatch(closeNavModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavModal);