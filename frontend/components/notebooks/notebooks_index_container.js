import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateNote } from '../../actions/note_actions';
import { openModal, openNavModal, closeNavModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { sortedItems } from '../../reducers/selectors';
import { setSort } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  let sortMethod = state.ui.sort ? state.ui.sort : null;
  let sorted_notebooks = state.entities.notebooks ? sortedItems(state.entities.notebooks, state.ui.sort) : null;

  return ({
    notebooks: sorted_notebooks,
    notes: state.entities.notes,
    currentUser,
    sortMethod: state.ui.sort
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal()),
    updateNote: noteId => dispatch(updateNote(noteId)),
    setSort: sortMethod => dispatch(setSort(sortMethod)),
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex));