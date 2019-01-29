import { connect } from 'react-redux';
import NoteEdit from './note_edit';
import { requestSingleNotebook } from '../../actions/notebook_actions';
import { requestSingleNote } from '../../actions/note_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    // notebook: state.entities.notebooks,
    // notes: Object.values(state.entities.notes)
    note: ownProps.note
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    requestSingleNotebook: (id) => dispatch(requestSingleNotebook(id)),
    requestSingleNote: (id) => dispatch(requestSingleNote(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEdit);