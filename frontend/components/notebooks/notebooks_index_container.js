import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks, deleteNotebook } from '../../actions/notebook_actions';

const mapStateToProps = (state) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  let sorted_notes = () => {
    let notes = Object.keys(state.entities.notes).map(id => state.entities.notes[id]);

    return notes.sort(function (a, b) {
      a = new Date(a.updated_at);
      b = new Date(b.updated_at);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  return ({
    notebooks: state.entities.notebooks,
    notes: state.entities.notes,
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    deleteNotebook: notebook => dispatch(deleteNotebook(notebook)),
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex));