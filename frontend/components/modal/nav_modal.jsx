import React, { Component } from 'react';
import { closeNavModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NoteBookActionsNavContainer from '../notebooks/modal/notebook_actions_nav_container';
import TagActions from '../notebooks/modal/tag_nav_modal';
import TaggingModal from './tagging_modal';
import NoteHeaderModal from './note_header_modal';
import NotebooksSortModal from './notebooks_sort_modal';

class NavModal extends Component {
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
      case 'notebook-actions-nav':
        component = <NoteBookActionsNavContainer notebookId={this.props.navModalId}/>;
        // component = <NoteBookActionsNavContainer notebookId={this.state.modalId} />;
        parentClass = 'navbar-user-actions';
        childClass = 'navbar-user-actions-child';
        break;
      case 'tag-actions-nav':
        // component = <TagActions tagId={this.state.modalId} />;
        component = <TagActions tagId={this.props.navModalId} />;
        parentClass = 'tag-actions';
        childClass = 'tag-actions-child';
        break;
      case 'tagging-nav':
        component = <TaggingModal tagId={this.props.navModalId} />;
        parentClass = 'tagging-nav-menu';
        childClass = 'tagging-nav-menu-child';
        break;
      case 'note-header-nav':
        component = <NoteHeaderModal noteId={this.props.navModalId} />;
        parentClass = 'note-header-nav';
        childClass = 'note-header-nav-child';
        break;
      case 'notebooks-sort':
        component = <NotebooksSortModal modalId={null} />;
        parentClass = 'notebooks-sort-nav';
        childClass = 'notebooks-sort-nav-child';
        break;
      case 'notes-sort':
        component = <NotebooksSortModal modalId={null} />;
        parentClass = 'notes-sort-nav';
        childClass = 'notes-sort-nav-child';
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
    ); } else {
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

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);