import React from 'react';
import { formatDateTime } from '../../util/datetime_util';

const NotebookNoteListItem = (props) => {
  return (
    <div className={`notebooks-index-item-hover ${props.rowSelector(props.idx+1)}`}>
      <div className='notebooks-item-col1 col1'>
        <div className='notebook-item-notes-detail-title-icon-note'><i className="far fa-address-book"></i></div>
        <button onClick={props.requestNotes(props.note)}><div className='notebook-item-notes-detail-title-text'>{props.note.title}</div></button>
      </div>

      <div className='notebooks-item-col2 col2'>
        <div className='notebook-item-created-by'>- </div>
      </div>

      <div className='notebooks-item-col3 col3'>
        <div className='notebook-item-updated'>{formatDateTime(props.note.updated_at)}</div>
      </div>

      <div className='notebooks-item-col4 col4'>
        <div className='notebook-item-shared-with'>- </div>
      </div>

      <div className='notebooks-item-col5 col5'>
        <div className='notebook-item-actions'>- </div>
      </div>
    </div>
  );
}

export default NotebookNoteListItem;