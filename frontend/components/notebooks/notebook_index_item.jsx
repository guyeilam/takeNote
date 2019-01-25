import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import NotebookDetailContainer from './notebook_detail_container';

const NotebooksIndexItem = ({ notebook, deleteNotebook }) => (
  <li className='notebooks-index-item'>
    <div className='notebooks-index-item-hover'>
    <span className='notebook-item-expand'><i className="fas fa-caret-right" /></span>
    <span className='notebook-item-icon'><i className="fas fa-book" /></span>
    <span className='notebook-item-title'><Link to={`/notebooks/${notebook.id}`}>{notebook.title} ({notebook.noteIds.length})</Link></span>
    <span className='notebook-item-created-by'>- </span>
    <span className='notebook-item-updated'>{notebook.updated_at}</span>
    <span className='notebook-item-shared-with'>- </span>
    <span className='notebook-item-actions'>
      <button className='notebook-item-delete-button' onClick={deleteNotebook(notebook)}>Delete</button>
    </span>
    </div>
  </li>
);

export default withRouter(NotebooksIndexItem);