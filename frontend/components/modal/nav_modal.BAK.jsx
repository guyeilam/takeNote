import React from 'react';
import { closeNavModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NoteBookActionsNavContainer from '../notebooks/notebook_actions_nav_container';

function NavModal({ navModal, closeNavModal, navModalId, idx }) {
  if (!navModal) {
    return null;
  }
  let component;
  let parentClass;
  let childClass;
  
  switch (navModal) {
    case 'notebook-actions-nav':
      component = <NoteBookActionsNavContainer />;
      parentClass = 'navbar-user-actions';
      childClass = `navbar-user-actions-child-${idx}`;
      break;
    default:
      return null;
  }
  return (
    <div className={parentClass} onClick={closeNavModal}>
      <div className={childClass} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);