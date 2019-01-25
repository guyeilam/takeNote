import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import NotebookDetailContainer from './notebook_detail_container';

const NotebooksIndexItem = ({ notebook }) => (
  <li className='notebooks-index-item'>
    <Link to={`/notebooks/${notebook.id}`}>
      <span className='notebook-item-expand'><i className="fas fa-caret-right" /></span>
      <span className='notebook-item-icon'><i className="fas fa-book" /></span>
      <span className='notebook-item-title'>{notebook.title} ({notebook.note_ids.length})</span>
      <span className='notebook-item-created-by'>- </span>
      <span className='notebook-item-updated'>{notebook.updated_at}</span>
      <span className='notebook-item-shared-with'>- </span>
      <span className='notebook-item-actions'>- </span>
    </Link>
  </li>
);

export default withRouter(NotebooksIndexItem);