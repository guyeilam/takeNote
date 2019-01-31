import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { openNavModal, closeNavModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks, deleteNotebook } from '../../actions/notebook_actions';
import { selectAllNotebooks } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  const currentId = state.session.id;
  const currentUser = state.entities.users[currentId] || null;
  
  return ({
    notebooks: state.entities.notebooks,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex));