import { connect } from 'react-redux';

import NotebooksIndex from './notebooks_index';
import { requestAllNotebooks } from '../../actions/notebook_actions';
import { selectAllNotebooks } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
    notebooks: selectAllNotebooks(state)
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestAllNotebooks: () => dispatch(requestAllNotebooks())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex);