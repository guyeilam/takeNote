import { connect } from 'react-redux';

import { openModal } from '../../actions/modal_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks, deleteNotebook, sortToggle } from '../../actions/notebook_actions';
import { selectAllNotebooks } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  return ({
    notebooks: selectAllNotebooks(state),
    sorted: state.sort,
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    deleteNotebook: notebook => dispatch(deleteNotebook(notebook)),
    openModal: modal => dispatch(openModal(modal)),
    openNavModal: (navModal, navModalId) => dispatch(openNavModal(navModal, navModalId)),
    closeNavModal: () => dispatch(closeNavModal()),
    sortToggle: (sortOption) => dispatch(sortToggle(sortOption))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex);