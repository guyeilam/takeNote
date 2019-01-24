import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import NotebookDetailContainer from './notebook_detail_container';

const NotebooksIndexItem = ({ notebook }) => (
  <li className='notebooks-index-item'>
    <Link to={`/notebooks/${notebook.id}`}>
      <span className='notebook-item-icon'><i className="fas fa-book"/></span>
      <span className='notebook-item-title'>{notebook.title}</span>
    </Link>
  </li>
);

export default withRouter(NotebooksIndexItem);