import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import NewNotebookFormContainer from '../notebooks/forms/new_notebook_form_container';
import RenameNotebookFormContainer from '../notebooks/forms/rename_notebook_form_container';
import NewTagForm from '../notebooks/forms/new_tag_container';
import RenameTagForm from '../notebooks/forms/rename_tag_container';
import MoveNoteContainer from '../notes/move_note_container';


function Modal({ modal, modalId, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'new-notebook':
      component = <NewNotebookFormContainer />;
      break;
    case 'rename-notebook':
      component = <RenameNotebookFormContainer notebookId={modalId}/>;
      break;
    case 'new-tag':
      component = <NewTagForm />;
      break;
    case 'rename-tag':
      component = <RenameTagForm tagId={modalId}/>;
      break;
    case 'move-note':
      component = <MoveNoteContainer noteId={modalId} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal,
    modalId: state.ui.navModalId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);