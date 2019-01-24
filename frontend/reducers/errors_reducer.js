import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import notebooksErrorsReducer from './notebooks_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  notebooks: notebooksErrorsReducer
});

export default errorsReducer;