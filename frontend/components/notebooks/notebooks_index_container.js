import { connect } from 'react-redux';

import { openModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks, deleteNotebook, sortToggle } from '../../actions/notebook_actions';
import { selectAllNotebooks } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
    notebooks: selectAllNotebooks(state),
    sorted: state.sort
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    deleteNotebook: notebook => dispatch(deleteNotebook(notebook)),
    openModal: modal => dispatch(openModal(modal)),
    sortToggle: (sortOption) => dispatch(sortToggle(sortOption))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex);