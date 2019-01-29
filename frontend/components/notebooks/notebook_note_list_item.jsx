import React from 'react';

const NotebookNoteListItem = (props) => {
  return (
      <li className='notebook-item-notes-detail-title'>
        <div className='notebook-item-notes-detail-title-icon'><i className="far fa-address-book"></i></div>
        <div className='notebook-item-notes-detail-title-text'>{props.note.title}</div>
      </li>
  );
}

export default NotebookNoteListItem;