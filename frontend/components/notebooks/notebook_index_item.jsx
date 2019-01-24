import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import NotebookDetailContainer from './notebook_detail_container';

const NotebooksIndexItem = ({ notebook }) => (
  <li className='notebooks-index-item'>
    <Route
          path="/notebooks/:notebookId"
          component={NotebookDetailContainer}
        />
    <Link to={`/notebooks/${notebook.id}`}>
      <span>{notebook.title}</span>
    </Link>
  </li>
);

export default withRouter(NotebooksIndexItem);