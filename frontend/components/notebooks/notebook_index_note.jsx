import React from 'react';
import { formatDateTime } from '../../util/datetime_util';

const NotebookIndexNote = (props) => {
  if (!props.note) {
    return null;
  } else {
    return (
      <div className={`notebooks-index-item-hover ${props.rowSelector(props.idx)}`}>
        <div className='notebooks-item-col1 col1'>
          <div className='notebook-item-notes-detail-title-icon-note'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M8 5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8zm8 11h1v-1h-1a.997.997 0 0 0-1 1v2h1v-2zM8 4h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1.5 4a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3z"></path></svg>  
          </div>
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
          <div className='notebook-item-actions'>
            <button onClick={props.deleteNote(props.note.id)}>Delete note</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotebookIndexNote;