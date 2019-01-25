import { connect } from 'react-redux';

import { openModal } from '../../actions/modal_actions';
import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks, deleteNotebook } from '../../actions/notebook_actions';
import { selectAllNotebooks } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
    notebooks: selectAllNotebooks(state)
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks()),
    deleteNotebook: notebook => dispatch(deleteNotebook(notebook)),
    openModal: modal => dispatch(openModal(modal))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex);