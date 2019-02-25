import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { sortedItems } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;

  let sortMethod = state.ui.sort ? state.ui.sort : null;
  let sorted_notebooks = state.entities.notebooks ? sortedItems(state.entities.notebooks, state.ui.sort) : null;

  return ({
    notebooks: sorted_notebooks,
    notes: state.entities.notes,
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal())
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex));