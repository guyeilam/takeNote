import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import notebooksErrorsReducer from './notebooks_errors_reducer';
import notesErrorsReducer from './notes_errors_reducer';
import tagsErrorsReducer from './tags_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  notebooks: notebooksErrorsReducer,
  notes: notesErrorsReducer,
  tags: tagsErrorsReducer
});

export default errorsReducer;