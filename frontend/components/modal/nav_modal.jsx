import React, { Component } from 'react';
import { closeNavModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NoteBookActionsNavContainer from '../notebooks/notebook_actions_nav_container';

class NavModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalId: this.props.idx
    };
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
      case 'notebook-actions-nav':
        component = <NoteBookActionsNavContainer notebookId={this.state.modalId}/>;
        parentClass = 'navbar-user-actions';
        childClass = 'navbar-user-actions-child';
        break;
      default:
        return null;
    }
    
    if (this.state.modalId === navModalId) {
      return (
        // <div className='navbar-modal-background' onClick={closeNavModal}>
        <div className={parentClass} onClick={closeNavModal}>
          <div className={childClass} onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
        // </div>
    ); } else {
      return null;
    }
  }
}

// function NavModal({ navModal, closeNavModal, navModalId, idx }) {
  
// }

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

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);